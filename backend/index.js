const WebSocket = require('ws')
const mqtt = require('mqtt')
require('dotenv').config()
const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL
const WS_PORT = process.env.WS_PORT
const MQTT_TOPIC = process.env.MQTT_TOPIC

// 创建一个WebSocket服务器
const wss = new WebSocket.Server({ port: WS_PORT })

// 当有新的WebSocket连接时，将该连接添加到一个集合中
const clients = new Set()
wss.on('connection', (ws) => {
  console.log('A new client connected')
  clients.add(ws)
  ws.on('close', () => clients.delete(ws))
})

// 连接到MQTT broker
const client = mqtt.connect(MQTT_BROKER_URL)

client.on('connect', () => {
  console.log('Connected to MQTT broker')
  // 订阅MQTT主题
  client.subscribe(MQTT_TOPIC)
})

client.on('message', (topic, message) => {
  console.log(`Received message on ${topic}: ${message}`)
  // 当接收到MQTT消息时，将消息推送到所有WebSocket连接
  for (const ws of clients) {
    ws.send(message.toString())
  }
})
