import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DatabaseService } from 'src/database/database.service';
import { SpecializationService } from 'src/specialization/specialization.service';

@Injectable()
export class DoctorService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly specializationService: SpecializationService,
  ) { }

  async create(createDoctorDto: CreateDoctorDto) {
    if (!createDoctorDto) throw new Error('No data provided');
    const specialization = await this.specializationService.findOne(
      { id: createDoctorDto.specializationId },
    );
    if (!specialization) throw new Error('Specialization not found');
    try {
      const doctor = await this.databaseService.doctor.create({
        data: {
          name: createDoctorDto.name,
          img: createDoctorDto.img,
          specializationId: specialization.id,
          days: createDoctorDto.days
        },
      });
      return doctor;
    } catch (error) {
      console.log(error.message);
    }
  }

  async findAll() {
    try {
      const doctors = await this.databaseService.doctor.findMany();
      return doctors;
    } catch (error) {
      console.log(error.message);
    }
  }

  async findOne(id: number) {
    if (!id) throw new Error('No id provided');
    try {
      const doctor = await this.databaseService.doctor.findUnique({
        where: {
          id: id,
        },
      });
      if (!doctor) throw new Error('Doctor not found');
      return doctor;
    } catch (error) {
      console.log(error.message);
    }
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    if (!id) throw new Error('No id provided');
    if (!updateDoctorDto) throw new Error('No data provided');
    const getDoctor = await this.findOne(id);
    if (!getDoctor) throw new Error('Doctor not found');
    if (!updateDoctorDto.specializationId) throw new Error('Cannot update specialization');
    try {
      const doctor = await this.databaseService.doctor.update({
        where: {
          id: id,
        },
        data: {
          ...updateDoctorDto,
        },
      });
      if (!doctor) throw new Error('Error removing doctor');
      return doctor;
    } catch (error) {
      console.log(error.message);
    }
  }

  async remove(id: number) {
    if (!id) throw new Error('No id provided');
    const getDoctor = await this.findOne(id);
    if (!getDoctor) throw new Error('Doctor not found');
    try {
      const doctor = await this.databaseService.doctor.delete({
        where: {
          id: id,
        },
      });
      if (!doctor) throw new Error('Error removing doctor');
      return doctor;
    } catch (error) {
      console.log(error.message);
    }
  }
}
