import { Module } from '@nestjs/common';
// import { UserController } from './user.controller';
import { UserController } from 'src/controllers/user.controller';
import { UserService } from 'src/services/user.service';
import { PrismaModule } from 'src/services/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], 
})
export class UserModule {}
