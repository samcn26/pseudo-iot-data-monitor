FROM node:16-alpine AS builder
RUN npm config set registry https://registry.npm.taobao.org

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ARG VITE_WEBSOCKET_URL
ENV VITE_WEBSOCKET_URL=$VITE_WEBSOCKET_URL

RUN npm run build

FROM nginx

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
