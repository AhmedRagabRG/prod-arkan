import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserMailerService {
    constructor(private readonly mailService: MailerService) { }

    async sendMail(msg, subject, to) {
        console.log(msg, subject, to)
        await this.mailService.sendMail({
            from: 'ahmed.shoshan@outlook.com',
            to: to,
            subject: subject,
            text: msg,
        });
    }
}