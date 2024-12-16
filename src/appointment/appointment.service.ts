import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { DatabaseService } from 'src/database/database.service';
import { Client, EmbedBuilder, TextChannel } from 'discord.js';
import { InjectDiscordClient } from '@discord-nestjs/core';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly databaseService: DatabaseService,
    @InjectDiscordClient() private readonly discordClient: Client,
  ) { }

  async create(createAppointmentDto: CreateAppointmentDto) {
    try {
      const appointment = this.databaseService.appointment.create({
        data: {
          name: createAppointmentDto.name,
          phoneNumber: createAppointmentDto.phoneNumber,
          service: createAppointmentDto.service,
          date: createAppointmentDto.date,
        },
      });

      await this.sendDiscordEmbed(
        'حجز موعد',
        `
            اسم العميل: ${createAppointmentDto.name}
            رقم الهاتف: ${createAppointmentDto.phoneNumber}
            الخدمة: ${createAppointmentDto.service}
            الموعد: ${this.formatDate(createAppointmentDto.date)}
        `,
        { text: 'Arkan Eye Center' },
        '1313933996887113728',
      );

      return appointment;
    } catch (error) {
      console.log(error.message);
    }
  }

  async findAll() {
    try {
      const appointments = await this.databaseService.appointment.findMany();
      return appointments;
    } catch (error) {
      console.log(error.message);
    }
  }

  async findOne(findData) {
    try {
      const appointments = await this.databaseService.appointment.findMany({
        where: findData,
      });
      return appointments;
    } catch (error) {
      console.log(error.message);
    }
  }

  async findOneWithMonth(day: number, month: number, year: number) {
    try {
      const startDate = new Date(year, month - 1, day);
      const endDate = new Date(year, month - 1, day + 1);

      const result = await this.databaseService.appointment.findMany({
        where: {
          date: {
            gte: startDate,
            lt: endDate,
          },
        },
      });
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }

  async remove(id: number) {
    if (!id) throw new Error('No id provided');
    const getAppointment = await this.findOne(id);
    if (!getAppointment) throw new Error('Appointment not found');
    try {
      const appointment = await this.databaseService.appointment.delete({
        where: {
          id: id,
        },
      });
      if (!appointment) throw new Error('Error removing appointment');
      return appointment;
    } catch (error) {
      console.log(error.message);
    }
  }

  async sendDiscordEmbed(
    header: string,
    content: string,
    footer: any,
    channelId: string,
  ) {
    const channel = await this.discordClient.channels.fetch(channelId);

    if (!(channel instanceof TextChannel)) {
      throw new Error('Invalid channel type');
    }
    const embed = new EmbedBuilder()
      .setTitle(header)
      .setDescription(content)
      .setColor('#0099ff')
      .setTimestamp()
      .setFooter(footer);
    await channel.send({ embeds: [embed] });
  }

  formatDate(date: Date | string): string {
    const formattedDate = new Date(date);
    formattedDate.setHours(formattedDate.getHours() - 2);
    return formattedDate.toLocaleDateString('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Africa/Cairo' // Adjust to your specific timezone
    });
  }
}
