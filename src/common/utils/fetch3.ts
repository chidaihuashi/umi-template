/* tslint:disable */

import 'whatwg-fetch';
import _ from 'lodash';
import { sourceMap } from './apiPathTranslator';

const nodeFetch = self.fetch.bind(this);

type HeaderObject = {
  [index: string]: string;
};

type BodyInit = string | FormData;

type RequestRedirect = 'follow' | 'error' | 'manual';

type FetchResponseType =
  | 'basic'
  | 'cors'
  | 'default'
  | 'error'
  | 'opaque'
  | 'opaqueredirect';

const contendType = {
  json: 'application/json',
  formData: 'multipart/form-data',
};

export type FetchOptions = {
  method?: string;
  headers?: HeaderObject;
  body?: BodyInit;
  redirect?: RequestRedirect;

  // node-fetch extensions
  timeout?: number;
  compress?: boolean;
  size?: number;
  follow?: number;
};

export type FetchResponse = {
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
  type: FetchResponseType;
  size: number;
  headers: HeaderObject;
  bodyUsed: boolean;
  json(): Promise<any>;
  text(): Promise<string>;
  buffer(): Promise<Buffer>;
};

function fromPairs(pairs: any) {
  const result: any = {};
  if (pairs == null) {
    return result;
  }
  for (const pair of pairs) {
    result[pair[0]] = pair[1];
  }
  return result;
}

function apiPathTranslator(url: string) {
  const match = /^<(\w*)>\/(.*)$/.exec(url);
  if (match) {
    return `${sourceMap[match[1]]}/${match[2]}`;
  }
  return url;
}

async function fetch(
  url: string,
  options: FetchOptions,
): Promise<FetchResponse> {
  // @ts-ignore
  return nodeFetch(apiPathTranslator(url), options);
}

function createOption(method: string, contentType: string, options: any) {
  const { body, credentials, headers } = options;

  const option: any = {
    method,
    headers: headers || {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
    },
    credentials: credentials || 'include',
  };
  if (method !== 'GET') {
    option.body = body;
  }
  return option;
}

async function createConnection(
  method: string,
  contentType: string,
  options: any,
) {
  const res = await fetch(
    options.path,
    createOption(method, contentType, options),
  );
  if (!res.ok) {
    console.error(
      'fetch3',
      `${options.describe ||
        ''}An error occurred in the request. Please check the correct path'`,
      res,
    );
    return { success: false };
  }
  return res.json();
}

function CreateServer(serverName: any) {
  function create(method: any, contentType: any, o: any, ...p: any) {
    const t = typeof o === 'string';
    const options = typeof o === 'string' ? {} : o;
    if (t) {
      options.name = o;
      let bodyIndex = 2;

      if (typeof p[0] === 'object' && !_.isArray(p[0])) {
        bodyIndex = 0;
      } else {
        options.parameter = p[0];
      }

      if (typeof p[1] === 'object') {
        bodyIndex = 1;
      } else {
        options.describe = p[1];
      }

      if (method !== 'GET') {
        options.body =
          contentType === contentType.formData
            ? p[bodyIndex]
            : JSON.stringify(p[bodyIndex]);
      }
    }
    const { name, parameter } = options;
    options.path = `${serverName}/${name}${
      parameter === undefined
        ? ''
        : parameter.map((value: any) => `/${value}`).join('')
    }`;
    return createConnection(method, contentType, options);
  }

  // @ts-ignore
  this.get = create.bind(this, 'GET', contendType.json);
  // @ts-ignore
  this.post = create.bind(this, 'POST', contendType.json);
  // @ts-ignore
  this.formData = create.bind(this, 'POST', contendType.formData);
}

// @ts-ignore
const init = fromPairs(
  Object.keys(sourceMap).map(s => [s, new CreateServer(`<${s}>`)]),
);

export default init;

interface ResponseJson {
  success: boolean;
  error?: string;
}

export { ResponseJson };
