import {Consumer as KafkaConsumer, Message, CompressionTypes} from 'kafkajs'

import kafka from './kafka-config'

import SendWelcomeEmail from '../handle-consumer/SendWelcomeEmail'
import SendNewBetsEmail from '../handle-consumer/SendNewBetsEmail'

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
                        // helloWorldConsumer({topic, message})
                        break
                    case 'welcome-email':
                        new SendWelcomeEmail().sendEmail(message, 'Welcome To Lottery TGL', 'send_welcome_email.ejs')
                        break
                    case 'new-bets-email':
                        new SendNewBetsEmail().sendEmail(message, 'Nice for make new Bets', 'send_new_bets_email.ejs')
                        break    
                }
            },
          })
    }
}
