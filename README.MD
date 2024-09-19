
# IOT Data Monitor

## 文件夹目录

- mqtt-broker
mqtt服务器：提供消息发布和订阅功能。

- simulator
模拟传感器：向mqtt发送temperature、humidity、timestamp。

- backend
模拟后端：接收mqtt的temperature、humidity、timestamp，并进行处理。

- frontend
前端：实时展示温度和湿度数据。

## 项目架构

```mermaid
sequenceDiagram
participant S as Simulator
participant M as MQTT Broker
participant B as Backend
participant F as Frontend

S->>M: 发布 temperature、humidity、timestamp
B->>M: 订阅消息
M->>B: 转发消息
F->>B: 请求建立 WebSocket 连接 (ws://...)
B-->>F: 确认 WebSocket 连接
note over F,B: 连接已建立，进入双向通信
loop
    B->>F: 发送数据
end

```

## 项目启动顺序

```mermaid
graph LR
A[mqtt-broker] --> B[simulator]
B --> C[backend]
C --> D[frontend]
```
