import Consumer from './kafka/Consumer'


(async () => {
    const consumer = new Consumer()
    console.log('ola')
    await consumer.connect()

    await consumer.subscribe('new-bets-email')

    await consumer.run()
})()
