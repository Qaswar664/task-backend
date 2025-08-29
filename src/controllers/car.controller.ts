import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CarService } from 'src/services/car.service';
import { CreateCarDto } from 'src/car/create-car.dto';
import { UpdateCarDto } from 'src/car/update-car.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Cars')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new car under a category' })
  create(@Request() req, @Body() createCarDto: CreateCarDto) {
    return this.carService.create(req.user.id, createCarDto);
  }

  @Get('category/:categoryId')
  @ApiOperation({ summary: 'Get all cars by category' })
  findByCategory(@Param('categoryId') categoryId: string, @Request() req) {
    return this.carService.findByCategory(categoryId, req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get car by ID' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.carService.findOne(id, req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update car by ID' })
  update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
    @Request() req,
  ) {
    return this.carService.update(id, req.user.id, updateCarDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete car by ID' })
  remove(@Param('id') id: string, @Request() req) {
    return this.carService.remove(id, req.user.id);
  }
}
