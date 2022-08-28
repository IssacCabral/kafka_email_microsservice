import { EachMessagePayload, KafkaMessage } from "kafkajs";

interface EachMessageProps{
  topic: string
  message: KafkaMessage
}

export default function helloWorldConsumer({topic, message}: EachMessageProps){
    console.log({
        value: message.value!.toString(),
        topic
      })
}