import { Module } from '@nestjs/common';
import { CategoryService } from 'src/services/category.service';
import { CategoryController } from 'src/controllers/category.controller';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService], 
})
export class CategoryModule {}
