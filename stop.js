const { exec } = require('child_process');

const ports = [1883, 3000, 8080];

function stopService(port) {
    return new Promise((resolve, reject) => {
        exec(`lsof -t -i:${port} | xargs kill -9`, (error) => {
            if (error) {
                console.error(`关闭端口 ${port} 失败: ${error.message}`);
                reject(error);
            } else {
                console.log(`端口 ${port} 已关闭`);
                resolve();
            }
        });
    });
}

async function stopAllServices() {
    try {
        for (const port of ports) {
            await stopService(port);
        }
    } catch (error) {
        console.error('服务停止过程中出现错误:', error);
    }
}

stopAllServices();