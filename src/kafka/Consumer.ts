import {Kafka, Consumer as KafkaConsumer, Message, CompressionTypes} from 'kafkajs'
import KafkaService from './service-kafka'

import helloWorldConsumer from '../handle-consumer/hello-world'
import SendWelcomeEmail from '../app/services/SendWelcomeEmail'

const kafka = new Kafka({
    clientId: 'api',
    brokers: ["kafka1:9091"]
})

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
                        helloWorldConsumer({topic, message})
                        break
                    case 'welcome-email':
                        SendWelcomeEmail(message)
                        break
                }
            },
          })
    }
}
