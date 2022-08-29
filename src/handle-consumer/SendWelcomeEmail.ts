import { Message as KafkaMessage } from 'kafkajs'
import Mailer from '../app/services/Mailer'

class SendWelcomeEmail{
    private mailer: Mailer
    private message: KafkaMessage
    private subject: string

    constructor(message: KafkaMessage, subject: string){
        this.message = message,
        this.subject = subject
        this.mailer = new Mailer()
    }

    async sendEmail(){
        await this.mailer.sendEmail(this.message, this.subject)
    }

}

export default SendWelcomeEmail