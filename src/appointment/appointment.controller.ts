import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':day/:month/:year')
  findOneWithMonth(@Param('day') day: string, @Param('month') month: string, @Param('year') year: string) {
    return this.appointmentService.findOneWithMonth(Number(day), Number(month), Number(year));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isNaN(+id)) throw new Error('id is not a number');
    return this.appointmentService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (isNaN(+id)) throw new Error('id is not a number');
    return this.appointmentService.remove(+id);
  }
}
