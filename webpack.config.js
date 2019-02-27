const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
 
module.exports = (env, argv) => {
    let config = {
        stats: { 
            colors: true,
            modules: true,
            children: false,
            chunks: false,
            chunkModules: false,
            assets: false,
            entrypoints: true
        },
        // stats: "verbose",
        context: __dirname, // to automatically find tsconfig.json
        entry: {
            bundle: ["./scripts/app.ts"]
        },
        output: {
            path: __dirname + "/wwwroot/lib/",
            publicPath: "./lib/",
            filename: "js/[name].js",
            chunkFilename: "js/chunk-[name].js"
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.vue'],
            alias: {
                vue: 'vue/dist/vue.common.js'
            },
            plugins: [
                new TsconfigPathsPlugin()
            ]
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                      chunks: 'all',
                      name: 'vendor',
                      test: 'vendor',
                      enforce: true
                    },
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    options: {
                        // disable type checker - we will use it in fork plugin
                        transpileOnly: true,
                        appendTsSuffixTo: ['\\.vue$'],
                        experimentalWatchApi: true,
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: __dirname + '/public/index.html',
                filename: __dirname + '/wwwroot/index.html'
            }),
            new VueLoaderPlugin(),
            new ForkTsCheckerWebpackPlugin({
                tslint: true,
                vue: true,
                async: false,
                formatter: "codeframe",
                useTypescriptIncrementalApi: true
            }),
        ]
    };
    return config;
}
