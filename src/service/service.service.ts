import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { DatabaseService } from 'src/database/database.service';
import { SpecializationService } from 'src/specialization/specialization.service';

@Injectable()
export class ServiceService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createServiceDto: CreateServiceDto) {
    if (!createServiceDto) throw new Error('No data provided');
    const service = await this.findOne({
      title: createServiceDto.title,
    });
    if (service) throw new Error('Service already exists');
    try {
      const service = await this.databaseService.service.create({
        data: {
          title: createServiceDto.title,
          img: createServiceDto.img,
          content: createServiceDto.content,
        },
      });
      return service;
    } catch (error) {
      console.log(error.message);
    }
  }

  async findAll() {
    try {
      const services = await this.databaseService.service.findMany();
      return services;
    } catch (error) {
      console.log(error.message);
    }
  }

  async findOne(findData) {
    if (!findData) throw new Error('No id provided');
    try {
      const service = await this.databaseService.doctor.findUnique({
        where: findData,
      });
      if (!service) throw new Error('Service not found');
      return service;
    } catch (error) {
      console.log(error.message);
    }
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    if (!id) throw new Error('No id provided');
    const getService = await this.findOne(id);
    if (!getService) throw new Error('Service not found');
    try {
      const service = await this.databaseService.service.update({
        where: {
          id: id,
        },
        data: {
          ...updateServiceDto,
        },
      });
      if (!service) throw new Error('Error removing doctor');
      return service;
    } catch (error) {
      console.log(error.message);
    }
  }
  
  async remove(id: number) {
    if (!id) throw new Error('No id provided');
    const getService = await this.findOne(id);
    if (!getService) throw new Error('Service not found');
    try {
      const service = await this.databaseService.service.delete({
        where: {
          id: id,
        },
      });
      if (!service) throw new Error('Error removing service');
      return service;
    } catch (error) {
      console.log(error.message);
    }
  }
}
