https://hub.docker.com/r/gildarts/ffmpegnode

# 打包一個 Docker
docker build -t gildarts/ffmpegnode:0.0.26 .

# 發佈 docker image
docker push gildarts/ffmpegnode:0.0.26

# 裝 curl
apk --no-cache add curl

# 進入 alpine 的內鍵 ash shell
docker container exec -it abdb1b46a02d /bin/ash

# synology NAS DB Password
2a5678

# dockerhub
gildarts / R..Z..%%%