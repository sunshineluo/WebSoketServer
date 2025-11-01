// === server.js ===
import { WebSocketServer } from "ws";

// 启动 WebSocket 服务（监听 8080 端口）
const port = process.env.PORT || 8080;
let onlineCount = 0;

// 监听连接
wss.on("connection", (ws) => {
  onlineCount++;
  broadcastOnlineCount();

  console.log(`✅ 新用户连接，当前在线人数：${onlineCount}`);

  // 断开连接
  ws.on("close", () => {
    onlineCount--;
    broadcastOnlineCount();
    console.log(`❌ 用户离开，当前在线人数：${onlineCount}`);
  });

  // 收到客户端消息（可选）
  ws.on("message", (msg) => {
    console.log("客户端消息:", msg.toString());
  });
});

// 广播在线人数给所有客户端
function broadcastOnlineCount() {
  const data = JSON.stringify({ type: "count", online: onlineCount });
  for (const client of wss.clients) {
    if (client.readyState === 1) client.send(data);
  }
}

server.listen(port, () => {
  console.log(`🚀 WebSocket 服务器已启动，端口：${port}`);
});
