# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:10-alpine as build-stage
LABEL maintainer="tristan.robert.44@gmail.com"
WORKDIR /app
COPY package*.json /app/
COPY jsconfig.json /app
COPY src/ /app/src
COPY public/ /app/public
COPY manifest.json /app
RUN npm install --production
COPY .env.sample /app/.env
COPY env.sh /app
ENV PUBLIC_URL=___PUBLIC_URL___
RUN apk update 
RUN apk upgrade 
RUN apk add --no-cache bash
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.17-alpine
COPY docker/nginx.conf.template /etc/nginx/conf.d/default.conf.template
ARG REACT_APP_BASENAME=/
ENV REACT_APP_NAME="RIE'AU"
ENV SERVER_PORT=3000
ENV REACT_APP_API_URL=http://localhost:5000
COPY --from=build-stage /app/build/ /usr/share/nginx/html${REACT_APP_BASENAME}
WORKDIR /usr/share/nginx/html${REACT_APP_BASENAME}
COPY public/index.html.template public/index.html.template
COPY .env.sample .env
COPY ./docker/entrypoint.sh /usr/local/bin/start
COPY ./env.sh env.sh
COPY ./index.sh index.sh
RUN chmod +x /usr/local/bin/start
RUN apk update && apk upgrade 
RUN apk add --no-cache bash
EXPOSE ${SERVER_PORT}
ENTRYPOINT [ "/bin/bash", "-c", "/usr/local/bin/start" ]