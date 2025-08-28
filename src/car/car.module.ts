import { Module } from '@nestjs/common';
import { CarService } from 'src/services/car.service';
import { CarController } from 'src/controllers/car.controller';
import { PrismaModule } from 'src/services/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService], 
})
export class CarModule {}
