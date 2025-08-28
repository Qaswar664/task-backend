import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateCarDto } from 'src/car/create-car.dto';
import { UpdateCarDto } from 'src/car/update-car.dto';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createCarDto: CreateCarDto) {
    // Verify category belongs to user
    const category = await this.prisma.category.findFirst({
      where: { id: createCarDto.categoryId, userId },
    });

    if (!category) {
      throw new ForbiddenException('Category not found or access denied');
    }

    return this.prisma.car.create({
      data: createCarDto,
      include: {
        category: true,
      },
    });
  }

  async findByCategory(categoryId: string, userId: string) {
    // Verify category belongs to user
    const category = await this.prisma.category.findFirst({
      where: { id: categoryId, userId },
    });

    if (!category) {
      throw new ForbiddenException('Category not found or access denied');
    }

    return this.prisma.car.findMany({
      where: { categoryId },
      include: {
        category: true,
      },
    });
  }

  async findOne(id: string, userId: string) {
    const car = await this.prisma.car.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!car || car.category.userId !== userId) {
      throw new NotFoundException('Car not found');
    }

    return car;
  }

  async update(id: string, userId: string, updateCarDto: UpdateCarDto) {
    await this.findOne(id, userId);

    return this.prisma.car.update({
      where: { id },
      data: updateCarDto,
      include: {
        category: true,
      },
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.car.delete({
      where: { id },
    });
  }
}