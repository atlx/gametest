const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/entry.ts",

    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        })
    ],

    output: {
        path: __dirname + "/public",
        filename: "build/[name].[contenthash].js"
    },

    resolve: {
        extensions: [".js", ".ts"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ]
    },

    mode: "development"
}
