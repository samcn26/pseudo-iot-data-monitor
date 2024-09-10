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

# Expose the server port
EXPOSE 8080

# Run the application
CMD [ "node", "app.js" ]
