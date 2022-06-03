FROM node:16 AS builder
RUN npm install --global create-react-app\
  && mkdir /app
WORKDIR /app
COPY react-app/src src/
COPY react-app/public public/
COPY react-app/package.json react-app/tsconfig.json react-app/.env /app/
#CMD ["/bin/sh", "-c", "sleep 1000"]
#TODO understand why @types needed updating.
RUN yarn\
  && yarn add @types/react@latest @types/react-dom@latest --dev\
  && yarn add react@latest react-dom@latest\
  && yarn build

FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/
RUN mkdir /etc/nginx/ssl
COPY ./swa.crt ./swa.key /etc/nginx/ssl/
COPY --from=builder /app/build/ /usr/share/nginx/html/
