import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({ description: 'Car make' })
  @IsString()
  @IsNotEmpty()
  make: string;

  @ApiProperty({ description: 'Car model' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ description: 'Manufacturing year of the car' })
  @IsInt({ message: 'Year must be an integer number' })
  @Min(2000, { message: 'Year must not be less than 2000' })
  @Max(new Date().getFullYear(), {
    message: `Year must not be greater than ${new Date().getFullYear()}`,
  })
  year: number;

  @ApiProperty({ description: 'Car color' })
  @IsString({ message: 'Color must be a string' })
  @IsNotEmpty({ message: 'Color should not be empty' })
  color: string;

  @ApiProperty({ description: 'Category ID to which the car belongs' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
