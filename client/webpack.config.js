const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const production = process.env.NODE_ENV === 'production';

module.exports = (env, argv) => {
    return {
        entry: {
            app: path.join(__dirname, 'src', 'index.tsx')
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader"
                        }
                    ]
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: argv.mode !== "production",
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: argv.mode !== "production",
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|svg|jpe?g|gif)$/,
                    loader: 'url-loader?limit=8192'
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        'file-loader',
                    ],
                },
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: 'ts-loader'
                    },
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: [ ".ts", ".tsx", ".js", ".jsx" ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebPackPlugin({
                template: "./src/index.html",
                filename: "./index.html"
            })
        ],
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        },
        optimization: {
            concatenateModules: production,
            nodeEnv: process.env.NODE_ENV,
            minimize: production,
            // optimization.minimizer overrides default optimization
            // in webpack 4.
            // plugin optimizer should be put here
            // not in plugins anymore as before
            minimizer: [
                // minify js
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            unused: false
                        }
                    }
                }),
                // Compress extracted CSS.
                // Possible duplicated CSS from differents components can be deduped.
                new OptimizeCSSPlugin({
                    cssProcessorOptions: {
                        safe: true
                    }
                })
            ],
            runtimeChunk: true,
            splitChunks: {
                chunks: 'all'
            }
        },
        // optimization: {
        //     splitChunks: {
        //         //chunks: 'all',
        //     },
        // },
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            compress: true,
            historyApiFallback: true,
            port: 8080,
            proxy: {
                '/api': {
                    target: 'http://localhost:3000',
                    secure: false
                }
            }
        }
    }
};
