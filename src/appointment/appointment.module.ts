import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { SpecializationService } from 'src/specialization/specialization.service';
import { DoctorService } from 'src/doctor/doctor.service';
import { DiscordModule } from '@discord-nestjs/core';
import { GatewayIntentBits, Partials } from 'discord.js';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DiscordModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        token: configService.get('DISCORD_BOT_TOKEN'),
        discordClientOptions: {
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
          ],
          partials: [Partials.Channel],
        },
      }),
      inject: [ConfigService]
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
