import config from '@/config/index';

export const sourceMap: { [name: string]: string } = {
  jupiter: config.JUPITER_API_PATH,
};

export default function(url: string) {
  const match = /^<(\w*)>\/(.*)$/.exec(url);
  if (match) {
    return `${sourceMap[match[1]]}/${match[2]}`;
  }
  return url;
}
