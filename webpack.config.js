// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == "development";

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: ["./dist/src/locationSearch/locationSearch.jsx"],
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist/"),
    },
    open: true,
    host: "localhost",
    port: 3000,
    hot: true,
    historyApiFallback: true,
    // contentBase: "./",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "dist/index.html",
    }),

    new MiniCssExtractPlugin(),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
