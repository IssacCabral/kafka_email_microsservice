import Consumer from './kafka/Consumer'


(async () => {
    const consumer = new Consumer()

    await consumer.connect()

    await consumer.subscribe('remember-to-bet-email')

    await consumer.run()
})()
