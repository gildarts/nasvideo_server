const path = require('path');

module.exports = {
  apps: [{
    name: "nas-video",
    script: "dist/server.bundle.js",
    watch: true,
    ignore_watch: [
      './pm2',
    ],
    node_args: [
      "--inspect"
    ],
    output: './pm2/out.log',
    error: './pm2/error.log'
  }, {
    name: "nas-video-brk",
    script: "dist/server.bundle.js",
    watch: true,
    ignore_watch: [
      './schema',
      './pm2'
    ],
    node_args: [
      "--inspect-brk"
    ],
    output: './pm2/out.log',
    error: './pm2/error.log'
  }]
}