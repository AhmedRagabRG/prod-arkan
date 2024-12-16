import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { SpecializationService } from 'src/specialization/specialization.service';
import { DoctorService } from 'src/doctor/doctor.service';
import { DiscordModule } from '@discord-nestjs/core';
import { GatewayIntentBits, Partials } from 'discord.js';

@Module({
  imports: [
    DiscordModule.forRootAsync({
      useFactory: () => ({
        token:
          'MTMxMzkxMzgzNzA4MjI1MTQwNQ.GU5_LF.ErB84A-36wzdaS7rlI59mst8pNRU73hJPLJusU',
        discordClientOptions: {
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
          ],
          partials: [Partials.Channel],
        },
      }),
    }),
    DiscordModule,
  ],
  controllers: [AppointmentController],
  providers: [
    AppointmentService, 
    SpecializationService, 
    DoctorService
  ],
})
export class AppointmentModule {}
