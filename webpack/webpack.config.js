const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

function resolveAbsolutePath(relativePath) {
  return require("path").join(__dirname, relativePath);
}

module.exports = (envVars) => {
  const { env } = envVars;
  const envConfig = require(resolveAbsolutePath(`./webpack.${env}.js`));
  const config = merge(commonConfig, envConfig);
  return config;
};
