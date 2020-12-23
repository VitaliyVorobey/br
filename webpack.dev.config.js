const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: {
        main: ["@babel/polyfill", "./src/chunks/main.js"],
    },

    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'web/build/'),
        publicPath: '/build/'


    },

    module: {
        rules: [
            {
                test: /\.html$/i,
                include: [
                    path.resolve(__dirname, 'src/html'),
                ],
                use: [{
                    loader: 'html-loader?attrs[]=img:src&attrs[]=source:srcset'
                }],

            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                include: [
                    path.resolve(__dirname, 'src/img'),
                ],
                exclude: /(\/fonts|samples)/,
                use: [

                    {
                        loader: 'file-loader', options: {
                            name: '[name].[ext]',
                            outputPath: 'img/'
                        }
                    },
                    {
                        loader: 'image-webpack-loader'
                    },
                ],
            },

            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                include: [
                    path.resolve(__dirname, 'src/fonts'),
                    path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts')
                ],
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                test: /\.js$/,
                include: [

                    path.resolve(__dirname, 'src/scripts'),


                ],
                use: {
                    loader: "babel-loader",
                }
            },

            {
                test: /\.(sa|sc|c)ss$/,
                include: [
                    path.resolve(__dirname, 'src/styles'),

                ],
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader", options: {}},

                    {
                        loader: "postcss-loader",
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')({
                                    'overrideBrowserslist': ['last 2 versions']
                                }),

                            ]
                        }
                    },
                    {loader: "sass-loader", options: {}},

                ]
            },

        ]
    },


    optimization: {
        minimize: false,

    },

    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            reload: true,
            server: {baseDir: ['web']}

        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),


        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "[name].css"
        }),


        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'web/index.html'),
            template: path.resolve(__dirname, 'src/index.html'),
            inject: true,
        }),




    ],

    devtool: 'eval-source-map',

    performance: {
        hints: false,
    },

    resolve: {
        modules: ['node_modules', 'src', 'web', './node_modules'],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json", "css", "scss", "less"],
        mainFields: ['browser', 'jsnext:main', 'main'],

    },

    target: 'web',
    watch: true
};
