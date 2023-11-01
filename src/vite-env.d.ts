/// <reference types="vite/client" />

interface ResData<T = any | []> {
  statusCode: number;
  msg: string;
  data?: T;
}
