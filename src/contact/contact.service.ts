import { Injectable } from '@nestjs/common';
import { Client, EmbedBuilder, TextChannel } from 'discord.js';
import { InjectDiscordClient } from '@discord-nestjs/core';
import { UserMailerService } from 'src/common/services/mailer.service';

@Injectable()
export class ContactService {
    constructor(
        @InjectDiscordClient() private readonly discordClient: Client,
        private userMailerService: UserMailerService
    ) { }

    async create(data) {
        try {
            console.log('=1')
            await this.sendDiscordEmbed(
                'تواصل معنا',
                `
                اسم العميل: ${data.name}
                رقم الهاتف: ${data.phoneNumber}
                الرسالة: ${data.message}
            `,
                { text: 'Arkan Eye Center' },
                '1316657483011330138',
            );
            console.log('=2')

            await this.userMailerService.sendMail(
                data.message,
                `${data.name} | ${data.phoneNumber}`,
                'info@arkaneyecenter.com',
            );
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
}
