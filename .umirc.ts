import { defineConfig } from 'umi';
import dva from 'dva';
import routes from './routes';

export default defineConfig({
  title: 'umi-template',
  dva: {
    immer: true,
    hmr: true,
  },
  styles: ['#root { height:100% }'],
  dynamicImport: {
    loading: '@/components/Loading',
  },
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  favicon: 'http://hw06.p2m.org.cn:4090/favicon.ico',
  routes,
});
