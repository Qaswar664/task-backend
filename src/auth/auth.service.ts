import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/services/prisma.service';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;

    this.logger.log(`Attempting to register user with email: ${email}`);

    try {
      // Check if user already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        this.logger.warn(`Registration failed: User with email ${email} already exists`);
        throw new ConflictException('User with this email already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user with transaction to ensure data consistency
      const user = await this.prisma.$transaction(async (tx) => {
        // Double-check for existing user within transaction
        const duplicateCheck = await tx.user.findUnique({
          where: { email },
        });

        if (duplicateCheck) {
          throw new ConflictException('User with this email already exists');
        }

        return tx.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });
      });

      this.logger.log(`User registered successfully: ${user.id}`);

      const payload = { sub: user.id, email: user.email };
      const token = this.jwtService.sign(payload);

      return {
        access_token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      
      this.logger.error(`Registration error: ${error.message}`, error.stack);
      
      // Check if it's a Prisma unique constraint error
      if (error.code === 'P2002') {
        throw new ConflictException('User with this email already exists');
      }
      
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    this.logger.log(`Login attempt for email: ${email}`);

    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        this.logger.warn(`Login failed: Invalid credentials for email ${email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      this.logger.log(`User logged in successfully: ${user.id}`);

      const payload = { sub: user.id, email: user.email };
      const token = this.jwtService.sign(payload);

      return {
        access_token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      
      this.logger.error(`Login error: ${error.message}`, error.stack);
      throw error;
    }
  }
}