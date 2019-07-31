# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:10.15-alpine as build-stage
LABEL maintainer="tristan.robert.44@gmail.com"
WORKDIR /app
COPY package*.json /app/
COPY jsconfig.json /app
COPY src/ /app/src
COPY public/ /app/public
COPY manifest.json /app
RUN npm install --production
COPY .env.sample /app/.env
ARG REACT_APP_BASENAME=/
ARG REACT_APP_DOMAIN=http://localhost:3000
ARG REACT_APP_API_MOCK=false
ARG REACT_APP_API_URL=http://localhost:5000
ARG REACT_APP_SSO_APP_URL=http://localhost:8080/auth
ARG REACT_APP_SSO_APP_REALM=rieau
ARG REACT_APP_SSO_APP_CLIENT_ID=rieau-ui
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.16-alpine
ARG REACT_APP_BASENAME=/
COPY --from=build-stage /app/build/ /usr/share/nginx/html${REACT_APP_BASENAME}
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx","-g","daemon off;"]