const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');


module.exports = {
    mode: 'production',
    devtool: 'false',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        sideEffects: true,
        concatenateModules: true,
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules|vendor[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },

    },

    plugins: [
        new ProgressBarPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new ImageMinimizerPlugin({
            minimizerOptions: {
                // Lossless optimization with custom option
                // Feel free to experiment with options for better result for you
                plugins: [
                    ['gifsicle', { interlaced: true }],
                    ['jpegtran', { progressive: true }],
                    ['optipng', { optimizationLevel: 5 }],
                    [
                        'svgo',
                        {
                            plugins: [
                                {
                                    removeViewBox: false,
                                },
                            ],
                        },
                    ],
                ],
            },
        }),

    ],
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                include: [
                    path.resolve(__dirname, 'src/img'),

                ],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash].[ext]',
                            outputPath: 'img/'
                        }
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
                        name: '[name].[contenthash].[ext]',
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
                                require('cssnano')({
                                    preset: 'default',
                                })
                            ]
                        }
                    },
                    {loader: "sass-loader", options: {}},
                ]
            },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, 'src/html'),
                use: [{
                    loader: 'html-loader?attrs[]=img:src&attrs[]=source:srcset'
                }],
            }
        ]
    },
    resolve: {
        modules: ['node_modules', 'src', 'web',  './node_modules'],
        extensions: [".js", ".json", "css", "scss"],
        mainFields: ['browser', 'jsnext:main', 'main'],
        symlinks: false,
    },
    target: 'web',
};

