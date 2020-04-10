/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * @format
 */

import * as FileSearch from './FileSearch';
import * as fs from 'fs';

/**
 * Try to find the currently installed React Native version by searching for and
 * reading it's package.json.
 */
export async function getInstalledRNVersion(
  searchPath: string,
): Promise<string> {
  const packagePath = await FileSearch.findReactPackage(searchPath);
  const packageJson = (await fs.promises.readFile(packagePath)).toString();
  const version = JSON.parse(packageJson).version;

  if (typeof version !== 'string') {
    throw new Error('Unexpected formt of React Native package.json');
  }

  return version;
}
