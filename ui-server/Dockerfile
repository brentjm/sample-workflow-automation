FROM node:14 AS builder
RUN npm install --global create-react-app\
  && mkdir /app
WORKDIR /app
COPY react-app/src src/
COPY react-app/public public/
COPY react-app/package.json react-app/tsconfig.json react-app/.env /app/
RUN yarn\
 && yarn build

FROM nginx
COPY ./app.conf /etc/nginx/conf.d/
RUN mkdir /etc/nginx/ssl
COPY ./frigg.crt ./frigg.key /etc/nginx/ssl/
COPY --from=builder /app/build/ /usr/share/nginx/html/
