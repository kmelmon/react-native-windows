/**
 * @format
 */
// @ts-check

const path = require('path');
const reactNativeWindowsPath = require.resolve('react-native-windows/package.json');
const installationPath = path.resolve(reactNativeWindowsPath, '../../../react-native-installation');
require('./installRNW').installRNW(installationPath);