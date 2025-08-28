// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import {
//   ExtractJwt,
//   Strategy,
//   StrategyOptionsWithoutRequest,
// } from 'passport-jwt';
// import { ConfigService } from '@nestjs/config';
// import { PrismaService } from 'src/services/prisma.service';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
//   constructor(
//     private configService: ConfigService,
//     private prisma: PrismaService,
//   ) {
//     const secret = configService.get<string>('JWT_SECRET');
//     if (!secret) {
//       throw new Error('JWT_SECRET environment variable is not set');
//     }

//     const opts: StrategyOptionsWithoutRequest = {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: secret,
//     };

//     super(opts);
//   }

//   async validate(payload: any) {
//     const user = await this.prisma.user.findUnique({
//       where: { id: payload.sub },
//     });

//     if (!user) {
//       throw new UnauthorizedException();
//     }

//     return { id: user.id, email: user.email, name: user.name };
//   }
// }

// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
  StrategyOptionsWithoutRequest,
} from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET environment variable is not set');
    }

    const opts: StrategyOptionsWithoutRequest = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    };

    super(opts);
  }

  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    // returned object will be attached to req.user
    return { id: user.id, email: user.email, name: user.name };
  }
}
