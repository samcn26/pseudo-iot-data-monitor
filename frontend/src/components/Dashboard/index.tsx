import { useEffect, useRef, useState } from 'react'
import ReconnectingWebSocket from 'reconnecting-websocket'
import * as echarts from 'echarts'
import { getWebSocketURL } from '../../utils'

type DataItem = {
  timestamp: string
  temperature: number
  humidity: number
}

const Dashboard = () => {
  const [data, setData] = useState<DataItem[]>([])
  // 用于引用图表容器的DOM元素
  const chartContainerRef = useRef<HTMLDivElement>(null)
  // 用于存储ECharts实例的引用
  const chartInstanceRef = useRef<echarts.ECharts>()

  useEffect(() => {
    // 建立WebSocket连接
    const url = getWebSocketURL()
    const ws = new ReconnectingWebSocket(url)

    ws.onmessage = (message) => {
      const newData = JSON.parse(message.data) as DataItem
      // 只保存最近1分钟的数据
      setData((prevData) => {
        const d = [
          ...prevData,
          {
            timestamp: newData.timestamp,
            temperature: newData.temperature,
            humidity: newData.humidity,
          },
        ]

        // 仅保留最近1分钟的活动数据
        const now = new Date().getTime()
        const activeData = d.filter((item) => {
          return now - new Date(item.timestamp).getTime() < 60 * 1000
        })
        return activeData
      })
    }

    return () => ws.close()
  }, [])

  useEffect(() => {
    if (chartContainerRef.current) {
      if (!chartInstanceRef.current) {
        // 初始化图表
        chartInstanceRef.current = echarts.init(chartContainerRef.current)
      }
      // 更新图表
      const options = {
        xAxis: {
          type: 'category',
          data: data.map((item) => item.timestamp),
        },
        yAxis: [
          {
            type: 'value',
            name: 'Temperature (°C)',
            position: 'left',
            axisLabel: {
              formatter: '{value} °C',
            },
          },
          {
            type: 'value',
            name: 'Humidity (%)',
            position: 'right',
            axisLabel: {
              formatter: '{value} %',
            },
          },
        ],
        series: [
          {
            name: 'Temperature',
            type: 'line',
            yAxisIndex: 0,
            data: data.map((item) => item.temperature),
          },
          {
            name: 'Humidity',
            type: 'line',
            yAxisIndex: 1,
            data: data.map((item) => item.humidity),
          },
        ],
      }
      chartInstanceRef.current.setOption(options)
    }
  }, [data])

  useEffect(() => {
    // 组件卸载时销毁图表实例
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose()
        chartInstanceRef.current = undefined
      }
    }
  }, [])

  return (
    <div>
      <div className="font-bold text-5xl text-center mb-8">
        IOT Data Monitor
      </div>
      <div
        ref={chartContainerRef}
        style={{ height: '600px', width: '600px' }}
      ></div>
    </div>
  )
}

export default Dashboard
