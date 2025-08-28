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
import { CategoryService } from 'src/services/category.service';
import { CreateCategoryDto } from 'src/category/create-category.dto';
import { UpdateCategoryDto } from 'src/category/update-category.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  async create(@Request() req, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(req.user.id, createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories for logged-in user' })
  async findAll(@Request() req) {
    return this.categoryService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID' })
  async findOne(@Param('id') id: string, @Request() req) {
    return this.categoryService.findOne(id, req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update category by ID' })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Request() req,
  ) {
    return this.categoryService.update(id, req.user.id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category by ID' })
  async remove(@Param('id') id: string, @Request() req) {
    return this.categoryService.remove(id, req.user.id);
  }
}
