const path = require("path")
module.exports = {
  /**
   * entry (line 6) tells Webpack where our
   * application starts and where to start bundling our files.
   * */
  entry: "./src/index.js",
  /**
   * The following line (line 6) lets webpack know
   * we’re working in development mode — This saves us from having
   * to add a mode flag when we run the development server.
   */
  mode: "production",
  /**
   * The module object helps define how your
   * exported javascript modules are
   * transformed and which ones are included
   * according to the given array of rules.
   * */
  module: {
    rules: [
      {
        /**
         * Our first rule is all about transforming our ES6
         * and JSX syntax. The test and exclude properties are
         * conditions to match file against. In this case, it’ll
         * match anything outside of the node_modules and
         * bower_components directories.
         * Since we’ll be transforming our .js and .jsx files as well,
         * we’ll need to direct Webpack to use Babel. Finally,
         * we specify that we want to use the env preset in options.
         * */
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        /**
         * The next rule is for processing CSS. Since we’re
         * not pre-or-post-processing our CSS, we just need to
         * make sure to add style-loader and css-loader to
         * the use property. css-loader requires style-loader
         * in order to work. loader is a shorthand for the
         * use property, when only one loader is being utilized.
         * */
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  /**
   * The resolve property allows us to specify which extensions
   * Webpack will resolve — this allows us to import modules without
   * needing to add their extensions.
   * */
  resolve: { extensions: ["*", ".js", ".jsx"] },
  /**
   * The output property tells Webpack where to put our bundled code.
   * The publicPath property specifies what directory the bundle
   * should go in, and also tells webpack-dev-server where to serve
   * files from.
   * */
  output: {
    path: path.resolve(__dirname, "dist/"),
    /**
     * publicPath specifies the public URL of the the directory —
     * at least as far as webpack-dev-server will know or care
     * If this is set incorrectly, you’ll get 404’s as the server
     * won’t be serving your files from the correct location
     * */
    publicPath: "/dist/",
    filename: "bundle.js",
  },
  devtool: "source-map",
  /**
   * set up webpack-dev-server in the devServer property. This doesn’t
   * require much for our needs — just the location we’re serving static
   * files from (such as our index.html) and the port we want to run the
   * server on. Note that devServer also has a publicPath property.
   * This publicPath tells the server where our bundled code actually is.
   * */
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 4000,
    publicPath: "http://localhost:4000/dist/",
    hotOnly: true,
  },
}
