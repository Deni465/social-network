const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => ({
    devtool: "eval-source-map",
    entry: [
        "@babel/polyfill",
        path.join(__dirname, "client", "style.css"),
        path.join(__dirname, "client", "src", "start.js"),
    ],
    output: {
        path: path.join(__dirname, "client", "public"),
        filename: "bundle.js",
    },
    performance: {
        hints: false,
    },
    devServer: {
        contentBase: path.join(__dirname, "client", "public"),
        proxy: {
            "/": {
                target: "http://localhost:3001",
            },
            "/socket.io": {
                target: "http://localhost:3001",
                ws: true,
            },
        },
        port: "3000",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve("url-loader"),
                options: {
                    limit: 10000,
                    name: "static/media/[name].[hash:8].[ext]",
                },
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        },
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css",
        }),
    ],
});
