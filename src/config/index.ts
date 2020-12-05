interface Config {
  AGORA_APP_ID: string;
  MEETING_PREFIX: string;
  JUPITER_API_PATH: string;
}

let config: Config;

function getConfig(): Config {
  if (!config) {
    const defaultConfig = require('./default');
    const envConfig = require(process.env.NODE_ENV === 'production'
      ? './production'
      : './development');
    config = Object.assign({ ...defaultConfig }, { ...envConfig });
  }
  return config;
}

export default getConfig();
