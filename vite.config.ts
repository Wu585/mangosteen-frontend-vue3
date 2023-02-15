import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {svgstore} from './src/vite_plugins/svgstore';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      mergeProps: true
    }),
    svgstore()
  ],
  server: {
    proxy: {
      '/api/v1': 'http://120.26.164.99:3060/'
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: any) {
          if (id.includes('echarts')) {
            return 'echarts';
          }
          if (id.includes('mock') || id.includes('faker')) {
            return 'mock';
          }
          if (id.includes('vant')) {
            return 'vant';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
});
