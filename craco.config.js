const path = require('path');

const nativeModulesToBundle = [
  '@react-native-community/masked-view',
  '@react-navigation/bottom-tabs',
  '@react-navigation/native',
  '@react-navigation/stack',
  'react-native-gesture-handler',
  'react-native-reanimated',
  'react-native-safe-area-context',
  'react-native-screens',
];

const getModulePath = name => path.resolve(__dirname, './node_modules/', name);

const includes = nativeModulesToBundle.map(getModulePath);
// console.log('----------includes---------', includes);

module.exports = {
  webpack: {
    configure: webpackConfig => {
      const indexes = [];
      webpackConfig.module.rules[1].oneOf.forEach((i, index) => {
        if (i && i.loader && i.loader.includes('babel-loader')) {
          indexes.push(index);
        }
      });

      indexes.forEach(i => {
        let newInclude = [];
        if (
          typeof webpackConfig.module.rules[1].oneOf[i].include === 'string'
        ) {
          newInclude = [webpackConfig.module.rules[1].oneOf[i].include];
        } else if (
          Array.isArray(webpackConfig.module.rules[1].oneOf[i].include)
        ) {
          newInclude = [...webpackConfig.module.rules[1].oneOf[i].include];
        }

        webpackConfig.module.rules[1].oneOf[i].include = [
          ...newInclude,
          ...includes,
        ];
      });

      return webpackConfig;
    },
  },
};
