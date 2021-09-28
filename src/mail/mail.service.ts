import { Injectable } from '@nestjs/common';
import { User } from '../entity/user/user.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendWelcomeMail(user: User) {
    await this.mailerService.sendMail({
      to: `${user.email}`,
      subject: 'Naruči kartu - Registracija',
      template: './welcome-mail.hbs',
      context: {
        name: user.name,
        surname: user.surname,
      },
    });
  }

  async sendMailForResetPassword(user: User, token: string) {
    await this.mailerService.sendMail({
      to: `${user.email}`,
      subject: 'NaručiKartu - Promjena lozinke',
      template: './reset-password.hbs',
      context: {
        name: user.name,
        surname: user.surname,
        token,
      },
    });
  }

  async sendMailForAcceptedOrder(email: string, name: string, surname: string) {
    await this.mailerService.sendMail({
      to: `${email}`,
      subject: 'Naruči kartu - Obavještenje o prihvatanju narudžbe',
      template: './order-accepted.hbs',
      context: {
        name: name,
        surname: surname,
      },
    });
  }

  async sendMailForRejectedOrder(email: string, name: string, surname: string) {
    await this.mailerService.sendMail({
      to: `${email}`,
      subject: 'Naruči kartu - Obavještenje o odbijanju narudžbe',
      template: './order-rejected.hbs',
      context: {
        name: name,
        surname: surname,
      },
    });
  }

  async sendMailForReceivedOrder(email: string, name: string, surname: string) {
    await this.mailerService.sendMail({
      to: `${email}`,
      subject: 'Naruči kartu - Obavještenje o prijemu narudžbe',
      template: './order-received.hbs',
      context: {
        name: name,
        surname: surname,
      },
    });
  }
}
