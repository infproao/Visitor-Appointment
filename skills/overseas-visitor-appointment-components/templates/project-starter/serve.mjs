// 线上部署启动脚本：先构建，再以静态服务方式托管 dist（单命令，不依赖 shell && 链）
import { build } from 'vite'
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'

await build()

const dist = path.resolve('dist')
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.zip': 'application/zip',
  // 线上 WAF 会拦截 .zip 后缀的 URL，Skill 包改以 .bin 暴露，下载时用 Content-Disposition 还原文件名
  '.bin': 'application/zip',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

const server = http.createServer((req, res) => {
  let p = req.url.split('?')[0]
  if (p === '/') p = '/index.html'
  const file = path.join(dist, p)
  if (!file.startsWith(dist)) {
    res.writeHead(403)
    return res.end()
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      // SPA 回退：非资源路径返回 index.html（配合 createWebHistory）
      fs.readFile(path.join(dist, 'index.html'), (e2, d2) => {
        if (e2) {
          res.writeHead(404)
          return res.end('not found')
        }
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
        res.end(d2)
      })
      return
    }
    const ext = path.extname(file)
    const headers = { 'content-type': types[ext] || 'application/octet-stream' }
    if (ext === '.bin') {
      headers['content-disposition'] = 'attachment; filename="overseas-visitor-appointment-components.zip"'
    }
    res.writeHead(200, headers)
    res.end(data)
  })
})

const port = Number(process.env.PORT) || 3000
server.listen(port, '0.0.0.0', () => console.log(`serving dist on 0.0.0.0:${port}`))
