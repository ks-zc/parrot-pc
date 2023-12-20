/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
const path = require('path');
const os = require('os');
const webpack = require('webpack');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const genericNames = require('generic-names');
const TerserPlugin = require('terser-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const __DEV__ = process.env.NODE_ENV === 'dev';

const happyThreadPool = HappyPack.ThreadPool({
    id: 'thread',
    size: os.cpus().length,
});

const config = {
    entry: {
        main: ['./src/index.tsx'],
    },
    output: {
        path: path.resolve(process.cwd(), 'output'),
        filename: '[name].[contenthash:20].js',
        assetModuleFilename: '[name][ext]',
        clean: true,
        publicPath: '',
        chunkLoadingGlobal: 'webpackJsonp',
    },
    mode: __DEV__ ? 'development' : 'production',
    devServer: {
        hot: true, // 热更新
        open: true, // 编译完自动打开浏览器
        compress: false, // 开启gzip压缩
        port: 'auto', // 开启端口号
        // history路由必须
        historyApiFallback: true,
        client: {
            // webpack日志等级
            logging: 'error',
            overlay: false,
        },
        // host: 'local-ipv4',
        // 禁用关闭时的二次确认
        setupExitSignals: false,
    },
    // 修改node_modules可触发更新
    snapshot: {
        managedPaths: [],
        immutablePaths: [],
    },
    devtool: __DEV__ ? 'cheap-module-source-map' : false,
    module: {
        rules: [
            {
                test: /(\.js|\.ts)x?$/,
                use: [{ loader: 'happypack/loader', options: { id: 'babel' } }],
                include: [
                    /(\.esm)|(\/es)|(\.modular.js)|(\.module.js)/,
                    /(\.ts)x?$/,
                    path.resolve(process.cwd(), 'src'),
                ],
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                type: 'asset',
                // parser: {
                //     dataUrlCondition: {
                //         maxSize: 8,
                //     },
                // },
            },
            getCssRules(true),
            getCssRules(false),
        ],
    },
    plugins: [
        // 全局变量
        new webpack.DefinePlugin({
            __DEV__,
            __PROD__: process.env.isPro,
        }),
        new HappyPack({
            id: 'babel',
            threadPool: happyThreadPool,
            loaders: ['babel-loader'],
            verbose: false,
        }),
        new NodePolyfillPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(process.cwd(), 'index.html'),
        }),
    ],
    resolve: {
        extensions: ['.js', '.tsx', '.ts', '.scss', '.css', '.png', '.json', '.jsx'],
        alias: {
            Src: path.resolve(process.cwd(), 'src'),
            Utils: path.resolve(process.cwd(), 'src/utils'),
            Components: path.resolve(process.cwd(), 'src/components'),
            Assets: path.resolve(process.cwd(), 'src/assets'),
            Models: path.resolve(process.cwd(), 'src/models'),
        },
    },
    optimization: {
        splitChunks: {
            maxSize: 1024 * 1024 * 1024,
            minSize: 1024 * 1024 * 1024,
        },
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
            }),
        ],
    },
};

const generateScope = genericNames('[local][hash:base64:5]', { context: process.cwd() });

function getCssRules(isModule) {
    return {
        test: isModule ? /.module\.((c|sa|sc)ss)$/i : /\.((c|sa|sc)ss)$/i,
        exclude: isModule ? [] : /.module\.((c|sa|sc)ss)$/i,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: isModule
                        ? {
                              getLocalIdent({ resourcePath }, localIdentName, localName) {
                                  return generateScope(localName, resourcePath);
                              },
                          }
                        : false,
                    url: false,
                    sourceMap: false,
                },
            },
            'sass-loader',
        ],
    };
}

module.exports = config;
