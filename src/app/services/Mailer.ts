import { Message as KafkaMessage} from 'kafkajs';
import { Transporter } from 'nodemailer'
import env from '../config/env'

import transporter_config from '../config/transporter_config';

import ejs from 'ejs'
import path from 'path';

export default class Mailer{
    private transporter: Transporter

    constructor(){
        this.transporter = transporter_config
    }

    async sendEmail(message: KafkaMessage, subject: string){
        const messageToJSON = JSON.parse(String(message.value!))

        const data = await ejs.renderFile('/app/src/views/send_welcome_email.ejs', { name: messageToJSON.name});

        await this.transporter.sendMail({
            from: env.SMTP_HOST,
            to: messageToJSON.email,
            subject,
            text: 'Olá meu amigo ' + messageToJSON.name,
            html: data
        })

        console.log('Um novo email ' + subject + ' foi enviado')
    }
    
}
