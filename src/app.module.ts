
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './auth/user.module';
import { CategoryModule } from './category/category.module';
import { CarModule } from './car/car.module';
import { PrismaModule } from './services/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    CategoryModule,
    CarModule,
  ],
})
export class AppModule {}
