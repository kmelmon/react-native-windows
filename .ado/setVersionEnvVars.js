// @ts-check
const fs = require('fs'); 
const path = require('path');
const child_process = require('child_process');
const semver = require('semver');
const pkgJsonPath = path.resolve(__dirname, "../vnext/package.json");

// Helper to format npmVersion in a way that the Version.rc resource files want it
function npmVersionToRcVersion(npmVersion) {
  let groups = npmVersion.split(/[\.-]/);
  const [major,minor,patch,_junk,prerelease] = groups;
  return `${major},${minor},${patch},${prerelease ? prerelease : '0'}`;
}

let pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));

// Record commit number, so that additional build tasks can record that commit in the nuget
const commitId = child_process.execSync(`git rev-list HEAD -n 1`).toString().trim();

let versionEnvVars = {
  RNW_PKG_VERSION_STR: pkgJson.version,
  RNW_PKG_VERSION_MAJOR: semver.major(pkgJson.version),
  RNW_PKG_VERSION_MINOR: semver.minor(pkgJson.version),
  RNW_PKG_VERSION_PATCH: semver.patch(pkgJson.version),
  npmVersion: pkgJson.version,
  publishCommitId: commitId
}

// Set the vars using the vso format for now too - while migrating from the vso publish task to the github actions one.

// Set env variable to allow VS to build dll with correct version information
console.log(`##vso[task.setvariable variable=RNW_PKG_VERSION_STR]${versionEnvVars.RNW_PKG_VERSION_STR}`);
console.log(`##vso[task.setvariable variable=RNW_PKG_VERSION_MAJOR]${versionEnvVars.RNW_PKG_VERSION_MAJOR}`);
console.log(`##vso[task.setvariable variable=RNW_PKG_VERSION_MINOR]${versionEnvVars.RNW_PKG_VERSION_MINOR}`);
console.log(`##vso[task.setvariable variable=RNW_PKG_VERSION_PATCH]${versionEnvVars.RNW_PKG_VERSION_PATCH}`);
// Set env variable to allow VS to build dll with correct version information
console.log(`##vso[task.setvariable variable=npmVersion;isOutput=true]${versionEnvVars.npmVersion}`);
console.log(`##vso[task.setvariable variable=publishCommitId;isOutput=true]${versionEnvVars.publishCommitId}`);


const dirPath = path.resolve(process.env.RUNNER_TEMP, 'versionEnvVars');
const scriptPath = path.resolve(dirPath, 'versionEnvVars.json');
if (!fs.existsSync(dirPath)) {
fs.mkdirSync(dirPath);
}

// I set the env var using both :: and ##, since github is in the process of changing the format
fs.writeFileSync(path.resolve(dirPath, 'versionEnvVars.js'), 
`
console.log("::[set-env name=RNW_PKG_VERSION_STR;]${versionEnvVars.RNW_PKG_VERSION_STR}");
console.log("##[set-env name=RNW_PKG_VERSION_STR;]${versionEnvVars.RNW_PKG_VERSION_STR}");
console.log("::[set-env name=RNW_PKG_VERSION_MAJOR;]${versionEnvVars.RNW_PKG_VERSION_MAJOR}");
console.log("##[set-env name=RNW_PKG_VERSION_MAJOR;]${versionEnvVars.RNW_PKG_VERSION_MAJOR}");
console.log("::[set-env name=RNW_PKG_VERSION_MINOR;]${versionEnvVars.RNW_PKG_VERSION_MINOR}");
console.log("##[set-env name=RNW_PKG_VERSION_MINOR;]${versionEnvVars.RNW_PKG_VERSION_MINOR}");
console.log("::[set-env name=RNW_PKG_VERSION_PATCH;]${versionEnvVars.RNW_PKG_VERSION_PATCH}");
console.log("##[set-env name=RNW_PKG_VERSION_PATCH;]${versionEnvVars.RNW_PKG_VERSION_PATCH}");
console.log("##vso[task.setvariable variable=RNW_PKG_VERSION_STR]${versionEnvVars.RNW_PKG_VERSION_STR}");
console.log("##vso[task.setvariable variable=RNW_PKG_VERSION_MAJOR]${versionEnvVars.RNW_PKG_VERSION_MAJOR}");
console.log("##vso[task.setvariable variable=RNW_PKG_VERSION_MINOR]${versionEnvVars.RNW_PKG_VERSION_MINOR}");
console.log("##vso[task.setvariable variable=RNW_PKG_VERSION_PATCH]${versionEnvVars.RNW_PKG_VERSION_PATCH}");
console.log("::[set-env name=npmVersion;]${versionEnvVars.npmVersion}");
console.log("##[set-env name=npmVersion;]${versionEnvVars.npmVersion}");
console.log("##vso[task.setvariable variable=npmVersion]${versionEnvVars.npmVersion}");
console.log("::[set-env name=publishCommitId;]${versionEnvVars.publishCommitId}");
console.log("##[set-env name=publishCommitId;]${versionEnvVars.publishCommitId}");
console.log("##vso[task.setvariable variable=publishCommitId]${versionEnvVars.publishCommitId}");
`);
fs.writeFileSync(scriptPath, JSON.stringify(versionEnvVars));
console.log(`Wrote script to: ${scriptPath}`);

