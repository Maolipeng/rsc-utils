import { defineConfig } from 'father';

export default defineConfig({
  esm: {
    input: 'src/client',  
    platform: 'browser', // 默认构建为 Browser 环境的产物
    transformer: 'babel',  
  },
  cjs: { 
    input: 'src/server',
    platform: 'node', // 默认构建为 Node.js 环境的产物
    transformer: 'esbuild', // 默认使用 esbuild 以获得更快的构建速度 
  },
  prebundle: {
    deps: {}
  },
});
