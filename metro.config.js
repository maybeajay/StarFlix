// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfigconfig = getDefaultConfig(__dirname);
defaultConfigconfig.resolver.assetExts.push('cjs')

module.exports = defaultConfigconfig;