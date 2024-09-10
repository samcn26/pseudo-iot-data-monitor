import React, { useEffect, useState } from 'react'
import ReconnectingWebSocket from 'reconnecting-websocket'
import ReactECharts from 'echarts-for-react'
import {getWebSocketURL} from '../utils'
console.log('ws:add', getWebSocketURL())

const Dashboard = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const url = getWebSocketURL() // replace with your backend WebSocket URL
    const ws = new ReconnectingWebSocket(url)

    ws.onmessage = (message) => {
      const newData = JSON.parse(message.data)
      //   only save latest 1 min data
      setData((prevData) => {
        const d = [
          ...prevData,
          {
            timestamp: newData.timestamp,
            temperature: newData.temperature,
            humidity: newData.humidity
          }
        ]

        // only remain active latest 1 min
        const now = new Date().getTime()
        const activeData = d.filter((item) => {
          return now - new Date(item.timestamp).getTime() < 60 * 1000
        })
        return activeData
      })
    }

    return () => ws.close()
  }, [])

  const options = {
    xAxis: {
      type: 'category',
      data: data.map((item) => item.timestamp)
    },
    yAxis: [
      {
        type: 'value',
        name: 'Temperature (°C)',
        axisLabel: {
          formatter: '{value} °C'
        }
      },
      {
        type: 'value',
        name: 'Humidity (%)',
        axisLabel: {
          formatter: '{value} %'
        }
      }
    ],
    series: [
      {
        name: 'Temperature',
        type: 'line',
        yAxisIndex: 0,
        data: data.map((item) => item.temperature)
      },
      {
        name: 'Humidity',
        type: 'line',
        yAxisIndex: 1,
        data: data.map((item) => item.humidity)
      }
    ]
  }

  return (
    <div>
      <h1>IOT Data simulation</h1>
      <ReactECharts
        option={options}
        style={{ height: '600px', width: '600px' }}
      />
    </div>
  )
}

export default Dashboard
