import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { SpecializationService } from 'src/specialization/specialization.service';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService, SpecializationService],
  exports: [DoctorService],
})
export class DoctorModule {}
