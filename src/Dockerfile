# Dockerfile para o front-end (Angular/React)
FROM node:20 AS build
WORKDIR /app
COPY ./front/ ./
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /app/dist/front /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
