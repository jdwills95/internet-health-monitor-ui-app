FROM node:18.10.0 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
FROM nginx:alpine
COPY --from=build app/dist/internet-health-monitor-ui-app /usr/share/nginx/html
