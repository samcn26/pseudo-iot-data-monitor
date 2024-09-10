## MQTT

### config

以下是一个基础的`mosquitto.conf`配置文件示例，这将为你的MQTT Broker提供基础的持久化和日志功能：

```conf
# Use the default listener 1883
listener 1883

# Enable MQTT over TCP
protocol mqtt

# Enable persistent storage
persistence true
persistence_location /mosquitto/data/

# Logging settings
log_dest file /mosquitto/log/mosquitto.log
log_type all
connection_messages true
log_timestamp true
```

以下是各个配置项的解释：

- `listener 1883`：在1883端口上监听连接。你可以更改这个值来改变MQTT Broker监听的端口。

- `protocol mqtt`：使用MQTT协议。Mosquitto还支持MQTT-SN和WebSockets。

- `persistence true`和`persistence_location /mosquitto/data/`：启用持久化，并将持久化数据存储在`/mosquitto/data/`目录中。你需要确保这个目录在容器中是可写的。

- `log_dest file /mosquitto/log/mosquitto.log`：将日志写入到`/mosquitto/log/mosquitto.log`文件中。你需要确保这个路径在容器中是可写的。

- `log_type all`：记录所有类型的日志。

- `connection_messages true`：记录客户端连接和断开的消息。

- `log_timestamp true`：在日志消息中添加时间戳。

这只是一个基础的配置。Mosquitto提供了很多配置选项，可以用来调整MQTT Broker的行为。你可以查阅[Mosquitto的配置文件文档](https://mosquitto.org/man/mosquitto-conf-5.html)了解更多。

### 测试

你已经在Docker中成功地运行了MQTT broker，并将其端口映射到了本机的1883端口。这样，你就可以直接在本机上用任何MQTT客户端来访问这个broker了。

如果你已经通过`brew install mosquitto`安装了Mosquitto的客户端工具，你可以用`mosquitto_sub`命令来测试这个broker。这个命令可以让你订阅一个MQTT主题并接收到这个主题的消息。

例如，你可以运行以下命令来订阅主题"test"：

```bash
mosquitto_sub -h localhost -t test
```

在这个命令中，`-h localhost`指定了MQTT broker的地址（即本机），`-t test`指定了你想要订阅的主题。

如果一切正常，这个命令应该不会有任何输出，而是会一直等待接收到主题"test"的消息。你可以打开另一个终端窗口，运行`mosquitto_pub`命令来发布一条消息到主题"test"：

```bash
mosquitto_pub -h localhost -t test -m "Hello, MQTT!"
```

在这个命令中，`-m "Hello, MQTT!"`指定了你想要发送的消息内容。

当你运行这个命令后，你应该能在运行`mosquitto_sub`的终端窗口中看到"Hello, MQTT!"这条消息。

## Frontend

### vite

- args injecting

```
use .env
in the code
import.meta.env.VITE_WEBSOCKET_URL
```



