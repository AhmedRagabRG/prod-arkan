import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { DiscordModule } from '@discord-nestjs/core';
import { GatewayIntentBits, Partials } from 'discord.js';
import { UserMailerService } from 'src/common/services/mailer.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ContactController],
  providers: [ContactService, UserMailerService],
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
  ],
})
export class ContactModule {}
