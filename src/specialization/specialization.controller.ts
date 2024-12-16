import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecializationService } from './specialization.service';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';

@Controller('specialization')
export class SpecializationController {
  constructor(private readonly specializationService: SpecializationService) {}

  @Post()
  create(@Body() createSpecializationDto: CreateSpecializationDto) {
    return this.specializationService.create(createSpecializationDto);
  }

  @Get()
  findAll() {
    return this.specializationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isNaN(+id)) throw new Error('id is not a number');
    return this.specializationService.findOne({id: +id});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecializationDto: UpdateSpecializationDto) {
    if (isNaN(+id)) throw new Error('id is not a number');
    return this.specializationService.update(+id, updateSpecializationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (isNaN(+id)) throw new Error('id is not a number');
    return this.specializationService.remove(+id);
  }
}
