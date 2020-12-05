import { message } from 'antd';

const defaultConfig: any = {
  maxCount: 1,
};

export function setConfig(options: any = {}, force = false) {
  message.config(force ? options : Object.assign(defaultConfig, options));
}

export function handleHeightChange(height: number) {
  setConfig({ top: height - 120 });
}

setConfig();
