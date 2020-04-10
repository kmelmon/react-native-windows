/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * @format
 */

import * as fs from 'fs';
import * as path from 'path';

import {OverrideFileRepository} from './FileRepository';

const DEFAULT_FILTER = /^.*\.(js|ts|jsx|tsx|cpp|h)$/;

/**
 * Allows reading phsyical override files based on a passed in directory
 */
export default class OverrideFileRepositoryImpl
  implements OverrideFileRepository {
  private baseDir: string;
  private filter: RegExp;

  constructor(baseDir: string, filter?: RegExp) {
    this.baseDir = baseDir;
    this.filter = filter || DEFAULT_FILTER;
  }

  async listFiles(): Promise<Array<string>> {
    return (await this.listFilesRec(this.baseDir))
      .filter(file => this.filter.test(file))
      .map(file => path.relative(this.baseDir, file));
  }

  async getFileContents(filename: string): Promise<string | null> {
    const filePath = path.join(this.baseDir, filename);
    try {
      return (await fs.promises.readFile(filePath)).toString();
    } catch {
      return null;
    }
  }

  async setFileContents(filename: string, content: string) {
    const filePath = path.join(this.baseDir, filename);
    return fs.promises.writeFile(filePath, content);
  }

  private async listFilesRec(file: string): Promise<Array<string>> {
    const stat = await fs.promises.stat(file);
    if (!stat.isDirectory()) {
      return [file];
    }

    const ret: Array<string> = [];
    const subfiles = await fs.promises.readdir(file);

    await Promise.all(
      subfiles.map(async subfile => {
        const fullPath = path.join(file, subfile);
        const childFiles = await this.listFilesRec(fullPath);
        ret.push(...childFiles);
      }),
    );

    return ret;
  }
}
