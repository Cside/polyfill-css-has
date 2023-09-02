const path = require("path");

const common = {
  entry: "./src/polyfill-css-has.ts",
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {},
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "polyfill-css-has.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
  },
  optimization: {
    minimize: false,
  },
};

const commonJS = {
  ...structuredClone(common),
  output: {
    filename: "index.cjs",
    path: `${__dirname}/dist/cjs`,
    library: {
      type: "commonjs",
    },
  },
};
commonJS.module.rules[1].use.options.configFile = "tsconfig.cjs.json";

const esModule = {
  ...structuredClone(common),
  experiments: {
    outputModule: true,
  },
  output: {
    filename: "index.mjs",
    path: `${__dirname}/dist/esm`,
    library: {
      type: "module",
    },
  },
};
esModule.module.rules[1].use.options.configFile = "tsconfig.esm.json";

module.exports = [commonJS, esModule];
