import Consumer from './kafka/Consumer'

(async () => {
    const topics = [
        'welcome-email',
        'new-bets-email',
        'remember-token-email',
        'remember-to-bet-email'
    ]

    const consumer = new Consumer()

    await consumer.connect()
    
    await consumer.subscribe(topics)

    await consumer.run()
})()
