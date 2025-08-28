import { Module } from '@nestjs/common';
// import { CarService } from './car.service';
// import { CarController } from './car.controller';
import { CarService } from 'src/services/car.service';
import { CarController } from 'src/controllers/car.controller';
import { PrismaModule } from 'src/services/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService], // export if other modules need it
})
export class CarModule {}
