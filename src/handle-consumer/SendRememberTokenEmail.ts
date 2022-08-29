import { Message as KafkaMessage } from 'kafkajs'
import Mailer from '../app/services/Mailer'

import env from '../app/config/env'
import ejs from 'ejs'

class SendRememberTokenEmail extends Mailer {
    constructor() {
        super()
    }

    async sendEmail(message: KafkaMessage, subject: string, fileName: string): Promise<void> {
        const {name, email, rememberMeToken} = JSON.parse(String(message.value!))

        const data = await ejs.renderFile('/app/src/views/' + fileName, { name, email, rememberMeToken });

        await this.transporter.sendMail({
            from: String(env.SMTP_FROM),
            to: email,
            subject,
            text: 'Olá meu amigo ' + name,
            html: data
        })

        console.log('Um novo email ' + subject + ' foi enviado para: ' + name)
    }

}

export default SendRememberTokenEmail