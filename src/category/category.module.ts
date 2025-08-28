import { Module } from '@nestjs/common';
// import { CategoryService } from './category.service';
// import { CategoryController } from './category.controller';
import { CategoryService } from 'src/services/category.service';
import { CategoryController } from 'src/controllers/category.controller';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService], // export if used by other modules
})
export class CategoryModule {}
