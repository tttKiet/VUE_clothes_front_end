/// <reference types="vite/client" />

interface ResData<T = any | []> {
  statusCode: number;
  msg: string;
  data?: T;
}

type Role = "admin" | "user";

interface User {
  _id: string;
  ho_ten_KH: string;
  so_dien_thoai: string;
  dia_chi: string;
}

interface UserLogin extends User {
  role: Role;
}
