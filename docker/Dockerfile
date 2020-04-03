# https://github.com/yourtion/docker-node-ffmpeg/blob/master/Dockerfile

FROM jrottenberg/ffmpeg:4.1-alpine

RUN adduser -D -u 1000 node \
    && apk add --no-cache libstdc++ \
    && apk add --no-cache --virtual --update nodejs nodejs-npm

RUN npm install pm2 -g

COPY ./dist /opt/nasvideo
WORKDIR /opt/nasvideo
RUN npm install

# /Volumes/video

ENTRYPOINT [ "pm2-runtime", "start", "ecosystem.config.js", "--only", "prod" ]
