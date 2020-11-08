const { resolve } = require('path');
const {webpack} = require('webpack');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/* const cssOutputLocation = process.env.NODE_ENV === 'production' ?
  'public/stylesheets/style-prod.css' :
  'stylesheets/style.css'; */

 /*  const jsProdOutput = {
    filename: 'public/javascripts/build-prod.js',
    path: resolve(__dirname),
    publicPath: '/',
  }; */
  
/*   const jsDevOutput = {
    filename: 'javascripts/build.js',
    path: '/',
    publicPath: '/',
  }; */

 // const jsOutputLocation = process.env.NODE_ENV === 'production' ? jsProdOutput : jsDevOutput;

module.exports = {
    context: resolve(__dirname, 'src'),
    entry: [
      'react-hot-loader/patch',
      /* 'react-hot-loader/babel',
      'webpack-hot-middleware/client', */
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './index.jsx',
    ],
    output: {
     filename: 'build.js',
     //path: '/',
     path: resolve(__dirname, 'public', 'javascripts'),
     publicPath: '/javascripts',
    },
    //jsOutputLocation,
    devServer: {
      hot: true,
      contentBase: resolve(__dirname, ''),
      publicPath: '/javascripts',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components|public\/)/,
            loader: 'babel-loader',
          },
          
        /* {
            test: /\.(scss|css)$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader','sass-loader'],
            }),
          }, */

          /* {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              use: [
                {
                  loader: 'css-loader',
                },
                {
                  loader: 'sass-loader',
                },
              ],
              fallback: 'style-loader',
            }),
          }, */
        ],
    },
    plugins: [
      //new webpack.HotModuleReplacementPlugin(),
      //new webpack.NamedModulesPlugin(),
      //new webpack.NoEmitOnErrorsPlugin(),
      //new ExtractTextPlugin('cssOutputLocation'),
    ],
};

/* if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(new UglifyJsPlugin());
  //module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin());
} */

/* if (process.env.NODE_ENV !== 'production') {
  module.exports.entry.unshift(
    'react-hot-loader/patch',
    //'react-hot-loader/babel',
    //'webpack-hot-middleware/client', 
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
  ); 
  
 // module.exports.plugins.unshift(new webpack.HotModuleReplacementPlugin());
}*/