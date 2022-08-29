import Consumer from './kafka/Consumer'


(async () => {
    const consumer = new Consumer()
    console.log('ola')
    await consumer.connect()

    await consumer.subscribe('welcome-email')

    await consumer.run()
})()
