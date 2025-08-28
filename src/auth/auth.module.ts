// // src/auth/auth.module.ts
// import { Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { JwtStrategy } from './jwt.strategy';

// @Module({
//   imports: [
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (cs: ConfigService) => ({
//         secret: cs.get<string>('JWT_SECRET'),
//         signOptions: { expiresIn: cs.get<string>('JWT_EXPIRES_IN') || '24h' },
//       }),
//     }),
//   ],
//   providers: [JwtStrategy],
//   exports: [PassportModule, JwtModule, JwtStrategy],
// })
// export class AuthModule {}
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtStrategy } from './jwt.strategy';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/services/prisma.module';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        secret: cs.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: cs.get<string>('JWT_EXPIRES_IN') || '24h' },
      }),
    }),
  ],
  controllers: [AuthController], // 👈 add this
  providers: [AuthService, JwtStrategy], // 👈 add AuthService
  exports: [PassportModule, JwtModule, JwtStrategy, AuthService],
})
export class AuthModule {}
