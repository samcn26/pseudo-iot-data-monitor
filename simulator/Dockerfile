# Use Node.js LTS version
FROM node:16-alpine
RUN npm config set registry https://registry.npm.taobao.org

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Set environment variables (you can override these in docker-compose or Kubernetes)
ENV MQTT_BROKER_URL=mqtt://localhost:1883
ENV POLLING_INTERVAL=5000
ENV SERVER_PORT=3000

# Expose the server port
EXPOSE 3000

# Run the application
CMD [ "node", "app.js" ]
