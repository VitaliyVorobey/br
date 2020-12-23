const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ResourceHintWebpackPlugin = require('./libs/resource-hints-webpack-plugin');
const {HashedModuleIdsPlugin} = require('webpack');
const ScriptExtphpWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    entry: {
        main: ["@babel/polyfill", "./src/chunks/main.js"],

    },
    output: {
        filename: 'js/[name].[contenthash].js',
        path: path.resolve(__dirname, 'web/build/'),
        publicPath: '/build/'
    },
    plugins: [

        new CleanWebpackPlugin(),


        new MiniCssExtractPlugin({

            filename: "css/[name].[contenthash].css",
            chunkFilename: "[name].[contenthash].css"
        }),


        new HtmlWebpackPlugin({

            filename: path.resolve(__dirname, 'web/index.html'),
            template: path.resolve(__dirname, 'src/index.html'),

            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
                removeScriptTypeAttributes: true,
            },
            inject: true,
            inlineSource: 'runtime',
            prefetch: false,
            preload: ['**/*.css'],

        }),

        new ResourceHintWebpackPlugin(),

        new MiniCssExtractPlugin({

            filename: "css/[name].[contenthash].css",
            chunkFilename: "[name].[contenthash].css"
        }),





        new HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 5,
        }),
        new ScriptExtphpWebpackPlugin({
            defaultAttribute: 'async'
        }),



        new FaviconsWebpackPlugin({
            logo: './src/img/favicon.png',
            title: "BorodiBar",
            appName: "BorodiBar",
            appDescription: "BorodiBar",
            short_name: "BorodiBar",
            background: "#000",
            theme_color: "#000",
            appleStatusBarStyle: "black-translucent",
            display: "fullscreen",
            orientation: "portrait",
            start_url: "/",
            version: "1.0",
            prefix: 'favicon/',
            logging: true,
            inject: true,
            persistentCache: true,
            emitStats: false,
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                coast: true,
                favicons: true,
                firefox: true,
                windows: true,
                yandex: false
            }

        }),


    ],
});
