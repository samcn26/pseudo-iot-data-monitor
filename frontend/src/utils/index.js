export const getWebSocketURL = () => {
  // 从环境变量中获取 WebSocket 地址
//   const webSocketURL = process.env.REACT_APP_WEBSOCKET_URL
  const webSocketURL = import.meta.env.VITE_WEBSOCKET_URL;
  return webSocketURL
}
