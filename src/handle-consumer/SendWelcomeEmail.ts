import { Message as KafkaMessage } from 'kafkajs'
import Mailer from '../app/services/Mailer'

import ejs from 'ejs'
import env from '../app/config/env'

class SendWelcomeEmail extends Mailer {
    constructor() {
        super()
    }

    async sendEmail(message: KafkaMessage, subject: string, fileName: string): Promise<void> {
        const messageToJSON = JSON.parse(String(message.value!))

        const data = await ejs.renderFile('/app/src/views/' + fileName, { name: messageToJSON.name });

        await this.transporter.sendMail({
            from: String(env.SMTP_FROM),
            to: messageToJSON.email,
            subject,
            text: 'Olá meu amigo ' + messageToJSON.name,
            html: data
        })

        console.log('Um novo email ' + subject + ' foi enviado para: ' + messageToJSON.name)
    }

}


export default SendWelcomeEmail