import express from 'express'
import mongoose, { connect } from 'mongoose'
import connectDB from './db/db.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const port =process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
connectDB()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})