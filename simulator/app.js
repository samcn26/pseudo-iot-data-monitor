const mqtt = require('mqtt')
const express = require('express')
const app = express()
require('dotenv').config();
const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883'
const POLLING_INTERVAL = parseInt(process.env.POLLING_INTERVAL) || 5000
const SERVER_PORT = parseInt(process.env.SERVER_PORT) || 3000
const MQTT_TOPIC = process.env.MQTT_TOPIC || 'sensors/data';

const client = mqtt.connect(MQTT_BROKER_URL)

let intervalId

client.on('connect', function () {
  console.log('Connectted to MQTT broker')
  intervalId = setInterval(() => {
    const now = new Date()
    const year = now.getFullYear()
    const month = (now.getMonth() + 1).toString().padStart(2, '0') // months start from 0 in JS
    const date = now.getDate().toString().padStart(2, '0')
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const seconds = now.getSeconds().toString().padStart(2, '0')
    const formattedTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
    const message = JSON.stringify({
      temperature: Math.floor(Math.random() * 30) + 10, // random temperature between 10 and 40
      humidity: Math.floor(Math.random() * 60) + 20, // random humidity between 20 and 80
      timestamp: formattedTime
    })

    client.publish(MQTT_TOPIC, message)
    console.log(`Message sent: ${message}`)
  }, POLLING_INTERVAL) // send message every POLLING_INTERVAL milliseconds
})

client.on('error', function (error) {
  console.error(`Failed to send message: ${error}`)
})

app.get('/start', (req, res) => {
  if (!intervalId) {
    intervalId = setInterval(() => {
      const message = JSON.stringify({
        temperature: Math.floor(Math.random() * 30) + 10, // random temperature between 10 and 40
        humidity: Math.floor(Math.random() * 60) + 20 // random humidity between 20 and 80
      })

      client.publish(MQTT_TOPIC, message)
      console.log(`Message sent: ${message}`)
    }, POLLING_INTERVAL)
  }

  res.send('Started sending messages')
})

app.get('/stop', (req, res) => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }

  res.send('Stopped sending messages')
})

app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on port ${SERVER_PORT}`)
})
