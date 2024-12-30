import { Injectable } from '@nestjs/common';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SpecializationService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createSpecializationDto: CreateSpecializationDto) {
    if (!createSpecializationDto) throw new Error('No data provided');
    const getSpecialization = await this.findOne({ name: createSpecializationDto.name });
    if (getSpecialization) throw new Error('Specialization already exists');
    try {
      const specialization = await this.databaseService.specialization.create({
        data: {
          name: createSpecializationDto.name,
          img: createSpecializationDto.img,
          content: createSpecializationDto.content,
        },
      });

      return specialization;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  }

  async findAll() {
    try {
      const specializations = await this.databaseService.specialization.findMany();
      return specializations;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  }

  async findOne(findData) {
    if (!findData) throw new Error('No id provided');
    try {
      const specialization =
        await this.databaseService.specialization.findFirst({
          where: findData,
        });
      if (!specialization) throw new Error('Specialization not found');
      return specialization;
    } catch (error) {
      console.error(error.message);
    }
  }

  async update(id: number, updateSpecializationDto: UpdateSpecializationDto) {
    if (!id) throw new Error('No id provided');
    const getSpecialization = await this.findOne({ id });
    if (!getSpecialization) throw new Error('Specialization not found');
    try {
      const specialization = await this.databaseService.specialization.update({
        where: {
          id: id,
        },
        data: {
          ...updateSpecializationDto,
        },
      });
      if (!specialization) throw new Error('Error removing doctor');
      return specialization;
    } catch (error) {
      console.error(error.message);
    }
  }

  async remove(id: number) {
    if (!id) throw new Error('No id provided');
    const getSpecialization = await this.findOne({ id });
    if (!getSpecialization) throw new Error('Specialization not found');
    try {
      const specialization = await this.databaseService.specialization.delete({
        where: {
          id: id,
        },
      });
      if (!specialization) throw new Error('Error removing specialization');
      return specialization;
    } catch (error) {
      console.log(error.message);
    }
  }
}
