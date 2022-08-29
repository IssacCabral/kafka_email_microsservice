import {Consumer as KafkaConsumer, Message, CompressionTypes} from 'kafkajs'

import kafka from './kafka-config'

import SendWelcomeEmail from '../handle-consumer/SendWelcomeEmail'
import SendNewBetsEmail from '../handle-consumer/SendNewBetsEmail'
import SendRememberTokenEmail from '../handle-consumer/SendRememberTokenEmail'
import SendRememberToBetEmail from '../handle-consumer/SendRememberToBetEmail'

export default class Consumer{
    public consumer: KafkaConsumer

    constructor(){
        this.consumer = kafka.consumer({groupId: 'test-group'})
    }

    async connect(){
        await this.consumer.connect()
    }

    async disconnect(){
        await this.consumer.disconnect()
    }

    async subscribe(topic: string){
        await this.consumer.subscribe({topic, fromBeginning: true})
    }

    async run(){
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                switch(topic){
                    case 'hello-world': 
                        console.log('ola mundo')
                        // helloWorldConsumer({topic, message})
                        break
                    case 'welcome-email':
                        new SendWelcomeEmail().sendEmail(message, 'Welcome To Lottery TGL', 'send_welcome_email.ejs')
                        break
                    case 'new-bets-email':
                        new SendNewBetsEmail().sendEmail(message, 'Nice for make new Bets', 'send_new_bets_email.ejs')
                        break    
                    case 'remember-token-email':
                        console.log('que estranho')
                        new SendRememberTokenEmail().sendEmail(message, 'Recover Your password', 'send_remember_token_email.ejs')
                        break
                    case 'remember-to-bet-email':
                        new SendRememberToBetEmail().sendEmail(message, 'We are missing you', 'send_remember_to_bet_email.ejs')
                        break       
                    default:
                        console.log('nao passei em nenhum')     
                }
            },
          })
    }
}
