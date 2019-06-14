const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = require('./config/paths');

module.exports = (env = {}, argv) => {
  require('./config/env')(env.ENVIRONMENT);
  const devMode = argv.mode !== 'production';

  const appEnv = Object.keys(process.env)
    .filter(key => /^APP_/i.test(key))
    .reduce((env, key) => {
      env[`process.env.${key}`] = JSON.stringify(process.env[key]);
      return env;
    }, {});

  return {
    mode: devMode ? 'development' : 'production',
    devtool: devMode ? 'eval-source-map' : false,
    entry: {
      app: paths.appIndexJs
    },
    output: {
      filename: devMode ? 'js/[name].js' : 'js/[name].[chunkhash:8].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    resolve: {
      alias: {
        '@': paths.appSrc
      }
    },
    optimization: {
      minimize: !devMode,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ],
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            name: 'vendors'
          }
        }
      },
      runtimeChunk: 'single'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', { targets: { node: 10 } }], '@babel/preset-react']
              }
            }
          ]
        },
        {
          test: /\.s?css$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: devMode
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: devMode,
                plugins: () => [require('autoprefixer')()]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: devMode
              }
            }
          ]
        },
        {
          test: /\.(gif|jpe?g|png|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[name].[hash:8].[ext]'
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                disable: devMode,
                gifsicle: {
                  interlaced: false
                },
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                optipng: {
                  enabled: false
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                }
              }
            }
          ]
        },
        {
          test: /\.(eot|otf|ttf|woff(2)?)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[hash:8].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(paths.appDist),
      !devMode && new CopyWebpackPlugin([{ from: paths.appPublic }]),
      new HtmlWebpackPlugin(
        Object.assign(
          {
            template: paths.appIndexHtml
          },
          !devMode
            ? {
                minify: {
                  collapseWhitespace: true,
                  keepClosingSlash: true,
                  minifyCSS: true,
                  minifyJS: true,
                  minifyURLs: true,
                  removeComments: true,
                  removeEmptyAttributes: true,
                  removeRedundantAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  useShortDoctype: true
                }
              }
            : undefined
        )
      ),
      !devMode && new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash:8].css' }),
      new webpack.DefinePlugin(appEnv),
      devMode && new webpack.HotModuleReplacementPlugin()
    ].filter(Boolean),
    devServer: {
      contentBase: paths.appPublic,
      historyApiFallback: true,
      host: 'localhost',
      hot: true,
      port: 3000
    }
  };
};
