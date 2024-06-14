export class MailService {
  async send() {
    console.info('Sending mail');
  }
}

export const mailService = new MailService();
