import express from 'express'
import env from './app/config/env'

const app = express()
const PORT = env.SERVER_PORT

app.use(express.json())

app.get('/', (req, res) => {
    return res.json({message: 'Email Service'})
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})