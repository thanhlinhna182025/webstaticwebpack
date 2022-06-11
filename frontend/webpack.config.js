const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');

/**
 * Function to generate HTML from template
 * @param {*} templateDir The tempalte directory
 * @returns Html filed in build directory
 */
function generateHtmlPlugins(templateDir = './src/pages') {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map((item) => {
        // Split names and extension
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(
                __dirname,
                `${templateDir}/${name}.${extension}`
            ),
        });
    });
}
const htmlPlugins = generateHtmlPlugins('./src/pages');

module.exports = {
    mode: 'development',
    entry: {
        main: ['./src/js/main.js', './src/js/about.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/[name].bundle.js',
        clean: true,
        publicPath: '/',
        assetModuleFilename: (pathData) => {
            const filepath = path
                .dirname(pathData.filename)
                .split('/')
                .slice(1)
                .join('/');
            return `${filepath}/[name].[ext][query]`;
        },
    },

    resolve: {
        modules: ['./node_modules'],
        // alias: {
        //     swiper: path.resolve(__dirname, './node_modules/swiper'),
        //     assets: path.resolve(__dirname, './src/assets'),
        // },
        fallback: {
            fs: false,
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            // process: 'process/browser',
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'src/assets/images',
                    to: 'assets/images',
                },
            ],
        }),
        new ImageminWebpWebpackPlugin({
            detailedLogs: true,
            overrideExtension: true,
            config: [
                {
                    test: /\.(png|jpg|jpeg|gif|tiff|bmp)/,
                    options: {
                        quality: 75,
                    },
                },
            ],
        }),
    ].concat(htmlPlugins),
    devtool: 'inline-source-map',

    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        hot: true,
        watchFiles: ['./src/pages/**/*.html'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif|tiff|bmp|svg)$/i,
                include: [path.resolve(__dirname, './src/assets/images')],
                type: 'asset/resource',
            },
            {
                test: /\.(svg)$/i,
                include: [path.resolve(__dirname, './src/assets/icons')],
                type: 'asset/resource',
            },
            {
                test: /\.(eot|woff|woff2|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name].[ext]',
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                sourceMap: true,
                                plugins: [
                                    'postcss-flexbugs-fixes',
                                    [
                                        'postcss-preset-env',
                                        {
                                            autoprefixer: {
                                                flexbox: 'no-2009',
                                            },
                                            stage: 3,
                                            features: {
                                                'custom-properties': false,
                                            },
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.font\.js/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    'webfonts-loader',
                ],
            },
        ],
    },
};
