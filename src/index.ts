import express from 'express'
import env from './app/config/env'
import { Kafka } from 'kafkajs'

import helloWorldConsumer from './handle-consumer/hello-world'

(async () => {
    const kafka = new Kafka({
        clientId: 'api',
        brokers: ["kafka1:9091"]
    })

    const consumer = kafka.consumer({groupId: 'test-group'})

    await consumer.connect()
    await consumer.subscribe({topic: 'hello-world', fromBeginning: true})

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            switch(topic){
                case 'hello-world': 
                    helloWorldConsumer({topic, message})
                    break
            }
        },
      })
})()