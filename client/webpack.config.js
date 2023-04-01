// requires plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    // sets mode to devlopment
    mode: "development",
    // starts at index.js
    entry: {
      main: "./src/js/index.js",
      // why
      install: "./src/js/install.js",
    },
    output: {
      // sets directory and sets name for bundle
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // pulls info from the index.html as a template
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "JATE",
      }),
      // injects service worker
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      // sets the webpack manifest, sets meta-data for the download
      new WebpackPwaManifest({
        // why would setting this true cahce for longer?
        fingerprints: false,
        inject: true,
        name: "Just Another Text Editor",
        short_name: "JATE",
        background_color: "#9e5f5a",
        theme_color: "#9e5f5a",
        start_url: "./",
        publicPath: "./",
        icons: [
          {
            // grabs images and sets their sizes
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          // calls css and sets style loader
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          // calls babel
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
