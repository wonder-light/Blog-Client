/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

const { configure } = require('quasar/wrappers');


module.exports = configure(function (ctx) {
    return {
        
        
        // https://v2.quasar.dev/quasar-cli/prefetch-feature
        preFetch: true,
        
        // app boot file (/src/boot)
        // --> boot files are part of "main.js"
        // https://v2.quasar.dev/quasar-cli/boot-files
        boot: [
            'axios',
            'config'
        ],
        
        // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
        css: [
            'app.css'
        ],
        
        // https://github.com/quasarframework/quasar/tree/dev/extras
        extras: [
            // 'ionicons-v4',
            // 'mdi-v5',
            // 'fontawesome-v6',
            // 'eva-icons',
            // 'themify',
            // 'line-awesome',
            // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!
            'roboto-font', // optional, you are not bound to it
            'material-icons', // optional, you are not bound to it
        ],
        
        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
        build: {
            target: {
                browser: [ 'es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1' ],
                node: 'node16'
            },
            
            vueRouterMode: 'history', // available values: 'hash', 'history'
            // vueRouterBase,
            // vueDevtools,
            // vueOptionsAPI: false,
            
            // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup
            
            // publicPath: '/',
            // analyze: true,
            env: {
                API: (ctx.dev || ctx.debug) ? 'https://localhost:7169' : 'https://api.nianian.cn',
                KEY: '7f96a4e63d822b7647be210436f2bdf3',
                A_MAP_KEY: '7f96a4e63d822b7647be210436f2bdf3',
            },
            // rawDefine: {}
            // ignorePublicFolder: true,
            minify: (ctx.dev || ctx.debug) ? false : 'esbuild', //boolean | 'terser' | 'esbuild';
            polyfillModulePreload: !ctx.dev,
            // distDir
            //alias
            
            extendViteConf(viteConf) {
                //viteConf.build.terserOptions = { compress: { /*生产环境时移除console*/drop_console: false, drop_debugger: false, }, }
            },
            // viteVuePluginOptions: {},
            
            
            vitePlugins: [
                ['@vitejs/plugin-vue-jsx', /*{ ..options.. }*/]
            ],
            
            sourcemap: (ctx.dev || ctx.debug)
        },
        
        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
        devServer: {
            // https: true
            open: true, // opens browser window automatically,
            port: '6078',
            host: '0.0.0.0',
        },
        
        // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
        framework: {
            config: {},
            
            // iconSet: 'material-icons', // Quasar icon set
            lang: 'zh-CN',//'en-US', // Quasar language pack
            
            // For special cases outside where the auto-import strategy can have an impact
            // (like functional components as one of the examples),
            // you can manually specify Quasar components/directives to be available everywhere:
            //
            // components: [],
            // directives: [],
            
            // Quasar plugins
            plugins: [
                'Meta',
                'Loading'
            ]
        },
        
        // animations: 'all', // --- includes all animations
        // https://v2.quasar.dev/options/animations
        animations: [],
        
        // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#property-sourcefiles
        // sourceFiles: {
        //   rootComponent: 'src/App.vue',
        //   router: 'src/router/index',
        //   store: 'src/store/index',
        //   registerServiceWorker: 'src-pwa/register-service-worker',
        //   serviceWorker: 'src-pwa/custom-service-worker',
        //   pwaManifestFile: 'src-pwa/manifest.json',
        //   electronMain: 'src-electron/electron-main',
        //   electronPreload: 'src-electron/electron-preload'
        // },
        
        // https://v2.quasar.dev/quasar-cli/developing-ssr/configuring-ssr
        ssr: {
            // ssrPwaHtmlFilename: 'offline.html', // do NOT use index.html as name!
            // will mess up SSR
            
            // extendSSRWebserverConf (esbuildConf) {},
            // extendPackageJson (json) {},
            
            pwa: false,
            
            // manualStoreHydration: true,
            // manualPostHydrationTrigger: true,
            
            prodPort: (ctx.dev || ctx.debug) ? 3000 : 6078, // The default port that the production server should use
            // (gets superseded if process.env.PORT is specified at runtime)
            
            middlewares: [
                'render' // keep this as last one
            ]
        },
        
        // https://v2.quasar.dev/quasar-cli/developing-pwa/configuring-pwa
        pwa: {
            workboxMode: 'generateSW', // or 'injectManifest'
            injectPwaMetaTags: true,
            swFilename: 'sw.js',
            manifestFilename: 'manifest.json',
            useCredentialsForManifestTag: false,
            // useFilenameHashes: true,
            // extendGenerateSWOptions (cfg) {}
            // extendInjectManifestOptions (cfg) {},
            // extendManifestJson (json) {}
            // extendPWACustomSWConf (esbuildConf) {}
        },
        
        // Full list of options: https://v2.quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
        cordova: {
            // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
        },
        
        // Full list of options: https://v2.quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
        capacitor: {
            hideSplashscreen: true
        },
        
        // Full list of options: https://v2.quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
        electron: {
            // extendElectronMainConf (esbuildConf)
            // extendElectronPreloadConf (esbuildConf)
            
            inspectPort: 5858,
            
            bundler: 'packager', // 'packager' or 'builder'
            
            packager: {
                // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
                
                // OS X / Mac App Store
                // appBundleId: '',
                // appCategoryType: '',
                // osxSign: '',
                // protocol: 'myapp://path',
                
                // Windows only
                // win32metadata: { ... }
            },
            
            builder: {
                // https://www.electron.build/configuration/configuration
                
                appId: 'blog'
            }
        },
        
        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
        bex: {
            contentScripts: [
                'my-content-script'
            ],
            
            // extendBexScriptsConf (esbuildConf) {}
            // extendBexManifestJson (json) {}
        }
    }
});
