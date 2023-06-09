const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
	return {
		mode: "development",
		// Entry point for files.
		entry: {
            editor : '/src/js/editor.js',
			main : "./src/js/index.js",
			install: "./src/js/install.js",
		},
		// Output for our bundles.
		output: {
			filename: "[name].bundle.js",
			path: path.resolve(__dirname, "dist"),
		},
		plugins: [
			// Webpack plugin that generates our html file and injects our bundles.
			new HtmlWebpackPlugin({
				template: "./index.html",
				title: "JATE",
			}),

			// Injects our custom service worker.
			new InjectManifest({
				swSrc: "./src-sw.js",
				swDest: "src-sw.js",
			}),
            
