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
  }
});
