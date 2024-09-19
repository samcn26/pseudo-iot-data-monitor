const { spawn } = require('child_process');

function setEnvironmentVariables() {
    return new Promise((resolve, reject) => {
        const envVars = {
            MQTT_BROKER_URL: 'mqtt://localhost:1883',
            WS_PORT: '8080',
            MQTT_TOPIC: 'sensors/data',
            POLLING_INTERVAL: '2000',
            SERVER_PORT: '3000'
        };

        Object.assign(process.env, envVars);
        console.log('环境变量设置成功');
        resolve();
    });
}

/**
 * 启动指定的服务
 * @param {string} serviceName 服务名称
 * @returns {Promise} 启动服务的Promise
 */
function startService(serviceName) {
    return new Promise((resolve, reject) => {
        // 使用spawn方法启动服务
        const process = spawn('node', [`${serviceName}/index.js`], {
            stdio: ['ignore', 'pipe', 'pipe'], // 设置标准输入、输出、错误流的处理方式
            detached: true // 使子进程在父进程退出后继续运行
        });

        // 释放子进程，使其不再受父进程的影响
        process.unref();

        // 监听子进程的标准输出
        process.stdout.on('data', (data) => {
            console.log(`${serviceName}: ${data}`);
        });

        // 监听子进程的标准错误输出
        process.stderr.on('data', (data) => {
            console.error(`${serviceName} 错误: ${data}`);
        });

        // 监听子进程的错误事件
        process.on('error', (error) => {
            console.error(`启动 ${serviceName} 失败: ${error.message}`);
            reject(error); // 如果子进程启动失败，reject Promise
        });

        console.log(`${serviceName} 启动成功`);
        resolve(); // 如果子进程启动成功，resolve Promise
    });
}

async function startAllServices() {
    try {
        await setEnvironmentVariables();
        await startService('mqtt-broker');
        await startService('backend');
        await startService('simulator');
        console.log('所有服务已启动');
    } catch (error) {
        console.error('服务启动过程中出现错误:', error);
    }
}

startAllServices();