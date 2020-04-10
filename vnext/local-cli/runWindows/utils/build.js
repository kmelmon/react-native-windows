/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 * @format
 */
// @ts-check
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const glob = require('glob');
const MSBuildTools = require('./msbuildtools');
const Version = require('./version');
const {commandWithProgress, newSpinner} = require('./commandWithProgress');
const util = require('util');
const existsAsync = util.promisify(fs.exists);

async function buildSolution(
  slnFile,
  buildType,
  buildArch,
  msBuildProps,
  verbose,
) {
  const minVersion = new Version(10, 0, 18362, 0);
  const allVersions = MSBuildTools.getAllAvailableUAPVersions();
  if (!allVersions.some(v => v.gte(minVersion))) {
    throw new Error(
      'Must have a minimum Windows SDK version 10.0.18362.0 installed',
    );
  }

  const msBuildTools = MSBuildTools.findAvailableVersion(buildArch, verbose);
  await msBuildTools.buildProject(
    slnFile,
    buildType,
    buildArch,
    msBuildProps,
    verbose,
  );
}

async function nugetRestore(nugetPath, slnFile, verbose, msbuildVersion) {
  const text = 'Restoring NuGet packages ';
  const spinner = newSpinner(text);
  console.log(nugetPath);
  await commandWithProgress(
    spinner,
    text,
    nugetPath,
    [
      'restore',
      `${slnFile}`,
      '-NonInteractive',
      '-Verbosity',
      verbose ? 'normal' : 'quiet',
      '-MSBuildVersion',
      msbuildVersion,
    ],
    verbose,
  );
}

async function restoreNuGetPackages(options, slnFile, verbose) {
  const nugetPath =
    options.nugetPath || path.join(os.tmpdir(), 'nuget.4.9.2.exe');

  const dlNugetText = 'Downloading NuGet Binary';
  const ensureNugetSpinner = newSpinner(dlNugetText);
  const exists = await existsAsync(nugetPath);
  if (!exists) {
    await commandWithProgress(
      ensureNugetSpinner,
      dlNugetText,
      'powershell',
      `$progressPreference = [System.Management.Automation.ActionPreference]::SilentlyContinue; Invoke-WebRequest https://dist.nuget.org/win-x86-commandline/v4.9.2/nuget.exe -outfile ${nugetPath}`.split(
        ' ',
      ),
      verbose,
    );
  }
  ensureNugetSpinner.succeed('Found NuGet Binary');

  const msbuildTools = MSBuildTools.findAvailableVersion('x86', verbose);
  try {
    await nugetRestore(
      nugetPath,
      slnFile,
      verbose,
      msbuildTools.installationVersion,
    );
  } catch (e) {
    if (!options.isRetryingNuget) {
      const retryOptions = Object.assign({isRetryingNuget: true}, options);
      fs.unlinkSync(nugetPath);
      return restoreNuGetPackages(retryOptions, slnFile, verbose);
    }
    throw e;
  }
}

function getSolutionFile(options) {
  return glob.sync(path.join(options.root, 'windows/*.sln'))[0];
}

function parseMsBuildProps(options) {
  if (options.msbuildprops) {
    var result = {};
    var props = options.msbuildprops.split(',');
    for (var i = 0; i < props.length; i++) {
      var prop = props[i].split('=');
      result[prop[0]] = prop[1];
    }
    return result;
  }
  return null;
}

module.exports = {
  buildSolution,
  getSolutionFile,
  restoreNuGetPackages,
  parseMsBuildProps,
};
