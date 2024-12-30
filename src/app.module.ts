import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DoctorModule } from './doctor/doctor.module';
import { SpecializationModule } from './specialization/specialization.module';
import { ServiceModule } from './service/service.module';
import { AppointmentModule } from './appointment/appointment.module';
import { SectionModule } from './section/section.module';
import { GatewayIntentBits, Partials } from 'discord.js';
import { DiscordModule } from '@discord-nestjs/core';
import { ContactModule } from './contact/contact.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { IpCheckMiddleware } from './ip-check/ip-check.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('EMAIL_HOST'),
          port: 587,
          secure: false, // Use TLS/STARTTLS
          auth: {
            user: configService.get('EMAIL_EMAIL'),
            pass: configService.get('EMAIL_PASSWORD'),
          },
        },
      }),
      inject: [ConfigService]
    }),
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
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      }
    ]),
    DatabaseModule,
    DoctorModule,
    SpecializationModule,
    ServiceModule,
    AppointmentModule,
    SectionModule,
    ContactModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IpCheckMiddleware)
      .forRoutes({ path: 'admin', method: RequestMethod.ALL });
  }
}
