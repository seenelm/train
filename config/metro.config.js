/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: [
      'bin',
      'txt',
      'jpg',
      'png',
      'ttf',
      'gif',
      'otf',
      'mp4',
      'webm',
      'wav',
      'mp3',
      'm4a',
      'aac',
      'oga',
      'xml',
      'webp',
      'html',
      'pdf',
    ],
  },
};
