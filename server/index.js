import express, { json } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoute from './routes/auth.js'

const app = express()

// Якась дічь шоб атеншн не вискакував
mongoose.set('strictQuery', true)

// Констати які витягуються з файла .env щоб вони не були в відкритому доступі
dotenv.config()
const PORT = process.env.PORT || 9998
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// Мідлвеїри
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoute)
// app.get('/', (req, res) => {
//     return res.json({massege: 'Все круто'})
// })


async function start() {
    try{
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.na5f9x6.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)

        app.listen(PORT, () => console.log(`Сервер запущений на порту ${PORT}`))
    }
    catch(e){
        console.log(e)
    }
}
start()