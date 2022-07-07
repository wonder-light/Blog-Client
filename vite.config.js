import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import path from "path";

// https://cn.vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(), vueJsx(),
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    base: '/',
    envDir: path.resolve(__dirname, "env"),
    server: {
        port: '6050',
        host: '0.0.0.0',
    },
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment'
    },
    build: {
        outDir: '../dist'
    },
    preview: {
        port: '6050',
    }
});
