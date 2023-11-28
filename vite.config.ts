import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginProjectMeta from './plugins/vitePluginProjectMeta'
import legacy from '@vitejs/plugin-legacy'

const base = '/music';
// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [
    react(),
    vitePluginProjectMeta(),
    legacy(),
  ],
  define: {
    __APP_NAME__: JSON.stringify('摸鱼乐谱 MIDI 网'),
    __BASE__: JSON.stringify(base),
    __PROJECT_DIR__: JSON.stringify('projects')
  }
})
