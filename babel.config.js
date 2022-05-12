module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            "@app/constants": "./src/constants",
            "@app/components": "./src/components",
            "@app/assets": "./src/assets",
            "@app/models": "./src/models",
            "@app/redux": "./src/redux",
            "@app/services": "./src/services",
          },
        }
      ]
    ]
  };
};
