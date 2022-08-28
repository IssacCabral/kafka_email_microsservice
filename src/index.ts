import express from 'express'
import env from './app/config/env'
import { Kafka } from 'kafkajs'

import helloWorldConsumer from './handle-consumer/hello-world'

import Consumer from './kafka/Consumer'

(async () => {
    console.log('ola')
    const consumer = new Consumer()
    
    await consumer.connect()

    await consumer.subscribe('hello-world')

    await consumer.run()
})()
