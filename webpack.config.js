const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const log = require('npmlog');

log.level = 'silly';
const root = __dirname;

/** environment setup */
const BUILD_DIR = './build';
const DIST_DIR = process.env.DIST_DIR || 'dist';// relative to BUILD_DIR
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development';
const DEVTOOLS = process.env.DEVTOOLS ? JSON.parse(process.env.DEVTOOLS) : false;
// optimize in production by default - otherwize, override with OPTIMIZE=false flag (if not optimized, sourcemaps will be generated)
const OPTIMIZE = process.env.OPTIMIZE ? JSON.parse(process.env.OPTIMIZE) : NODE_ENV === 'production';
const LINTER = process.env.LINTER ? JSON.parse(process.env.LINTER) : true;
const FAIL_ON_ERROR = process.env.FAIL_ON_ERROR ? JSON.parse(process.env.FAIL_ON_ERROR) : false;// disabled on dev-server mode, enabled in build mode
const STATS = process.env.STATS ? JSON.parse(process.env.STATS) : false; // to output a stats.json file (from webpack at build - useful for debuging)

function failBuildOnError() {
  if (!FAIL_ON_ERROR) {
    return new webpack.NoErrorsPlugin();
  }
}

function copyDocs() {
  return new CopyWebpackPlugin([{
    from: './src/docs/docs-assets/',
    to: 'docs-assets'
  }, {
    from: './src/docs/docs.html',
    to: 'docs.html'
  }]);
}

function copyManifestLocales() {
  return new CopyWebpackPlugin([{
    from: './public/_locales',
    to: '_locales'
  }]);
}

function copyFontAwesomeFonts() {
  return new CopyWebpackPlugin([{
    from: './node_modules/font-awesome/fonts/',
    to: 'font-awesome'
  }]);
}

function buildManifest() {
  return new CopyWebpackPlugin([{
    from: './public/manifest.json',
    to: 'manifest.json'
  }]);
}

function buildExtensionIcon() {
  return new CopyWebpackPlugin([{
    from: './public/assets/images/AWLogo16.png',
    to: 'icons/icon16x16.png'
  }, {
    from: './public/assets/images/AWLogo20.png',
    to: 'icons/icon20x20.png'
  }, {
    from: './public/assets/images/AWLogo24.png',
    to: 'icons/icon24x24.png'
  }, {
    from: './public/assets/images/AWLogo32.png',
    to: 'icons/icon32x32.png'
  }, {
    from: './public/assets/images/AWLogo64.png',
    to: 'icons/icon64x64.png'
  }, {
    from: './public/assets/images/AWLogo128.png',
    to: 'icons/icon128x128.png'
  }, {
    from: './public/assets/images/AWLogo256.png',
    to: 'icons/icon256x256.png'
  }, {
    from: './public/assets/images/AWLogo512.png',
    to: 'icons/icon512x512.png'
  }]);
}

function buildCss() {
  return new ExtractTextPlugin('[name].css', {disable: false, allChunks: true});
}

function defineGlobalVariables() {
  return new webpack.DefinePlugin({
    'process.env':{
      'NODE_ENV': JSON.stringify(NODE_ENV),
      'DEVTOOLS': DEVTOOLS,
      'LINTER': LINTER
    }
  });
}

function buildStatsReport() {
  if (STATS) {
    return function() {
      this.plugin('done', function(stats) {
        require('fs').writeFileSync(
          path.join(__dirname, BUILD_DIR, DIST_DIR, 'stats.json'),
          JSON.stringify(stats.toJson()));
      });
    };
  }
}

function uglifyBuild() {
  if (OPTIMIZE) {
    return new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    });
  }
}

function dedupeBuild() {
  if (OPTIMIZE) {
    return new webpack.optimize.DedupePlugin();
  }
}

function setupPlugins() {
  const plugins = [
    failBuildOnError(),
    copyDocs(),
    copyManifestLocales(),
    copyFontAwesomeFonts(),
    buildManifest(),
    buildExtensionIcon(),
    buildCss(),
    defineGlobalVariables(),
    dedupeBuild(),
    uglifyBuild(),
    buildStatsReport()
  ];
  return _.compact(plugins);
}

function setupPreloaders() {
  const preloaders = [];
  if (LINTER) {
    preloaders.push({
      test: /\.js(x?)$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    });
  }
  return preloaders;
}

function checkDirPath() {
  if (/^\w+/.test(DIST_DIR) === false || /\/$/.test(DIST_DIR) === true) {
    log.error('webpack', `DIST_DIR should not contain trailing slashes nor invalid leading chars - you passed "${DIST_DIR}"`);
    process.exit(1);
  }
}

function logBuildConfig() {
  log.info('webpack', 'Launched in build mode');
  log.info('webpack', `${NODE_ENV.toUpperCase()} mode`);
  if (NODE_ENV === 'development') {
    log.info('webpack', 'HOT RELOAD: activated');
  }

  if (DEVTOOLS) {
    log.info('webpack', 'DEVTOOLS active');
  }

  if (!OPTIMIZE) {
    log.info('webpack', 'SOURCEMAPS activated');
  }

  if (FAIL_ON_ERROR) {
    log.info('webpack', 'NoErrorsPlugin disabled, build will fail on error');
  }

  if (OPTIMIZE) {
    log.info('webpack', 'OPTIMIZE: code will be compressed and deduped');
  }

  log.info('webpackbuild', `rootdir: ${root}`);
  log.info('webpack', `LINTER ${LINTER ? 'ENABLED' : 'DISABLED'}`);
}

checkDirPath();
logBuildConfig();

const config = {
  bail: FAIL_ON_ERROR,
  entry: {
    content: './src/content.js',
    background: './src/services/background.js',
    docs: './src/docs/index.js',
    'native-commands-handler': './src/services/native-commands-handler.js',
    app: './src/style/app.scss',
    body: './src/style/body.scss',
    'docs-styles': './src/style/docs.scss'
  },
  output: {
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: BUILD_DIR + '/' + DIST_DIR
  },
  cache: true,
  debug: NODE_ENV === 'production' ? false : true,
  devtool: OPTIMIZE ? false : 'sourcemap',
  devServer: {
    host: 'localhost'
  },
  extensions: ['', '.js', '.jsx'],
  module: {
    preLoaders: setupPreloaders(),
    loaders: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader',
          'css-loader?sourceMap!resolve-url!sass-loader?sourceMap=true&sourceMapContents=true&outputStyle=expanded&' +
          'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
        )
      },
      {
        test: /\.css/,
        loader: 'style-loader!css-loader'
      },
      { test: /\.(png)$/, loader: 'url-loader?limit=' + 0 + '&name=assets/[hash].[ext]' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=' + 0 + '&mimetype=application/font-woff&name=assets/[hash].[ext]' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=' + 0 + '&mimetype=application/font-woff&name=assets/[hash].[ext]' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=' + 0 + '&mimetype=application/octet-stream&name=assets/[hash].[ext]' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?&name=assets/[hash].[ext]' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=' + 0 + '&mimetype=image/svg+xml&&name=assets/[hash].[ext]' }

    ]
  },
  plugins: setupPlugins(),
  node:{
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  watch: NODE_ENV === 'production' ? false : true
};

module.exports = config;
