import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    open: true
  },
  // 线上发布：sites 沙箱通过 PORT 环境变量注入端口，preview 需监听 0.0.0.0 并放行反代 Host，
  // 否则会报 "Blocked request" 或监听错端口。本地无 PORT 时回落 4173。
  preview: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 4173,
    strictPort: true,
    allowedHosts: true
  }
})
