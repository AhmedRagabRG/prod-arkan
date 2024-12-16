import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { DiscordModule } from '@discord-nestjs/core';
import { GatewayIntentBits, Partials } from 'discord.js';
import { UserMailerService } from 'src/common/services/mailer.service';

@Module({
  controllers: [ContactController],
  providers: [ContactService, UserMailerService],
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
  ],
})
export class ContactModule {}
