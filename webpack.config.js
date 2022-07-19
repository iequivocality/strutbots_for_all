const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    return {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
            assetModuleFilename: 'images/[hash][ext][query]',
        },
        mode: 'development',
        resolve: {
            modules: ['./src', 'node_modules'],
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    enforce: 'pre',
                    use: ['source-map-loader'],
                },
                {
                    test: /\.tsx?$/,
                    use: ['ts-loader'],
                },
                {
                    test: /\.s(a|c)ss$/,
                    use: [
                        'style-loader',
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: '[local]',
                                },
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                // Prefer `dart-sass`
                                implementation: require('sass'),
                            },
                        },
                        'postcss-loader',
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif|jp2|webp)$/,
                    type: 'asset/resource',
                },
                {
                    test: /\.(ogg|mp3|wav|mpe?g)$/i,
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
            }),
            new MiniCssExtractPlugin({
                filename: '[name].bundle.css',
                chunkFilename: '[id].css',
            }),
        ],
        devServer: {
            static: {
                directory: path.resolve(__dirname, 'dist'),
                publicPath: '/',
            },
            client: {
                overlay: false,
            },
            port: 8888,
            historyApiFallback: true,
        },
    };
};
