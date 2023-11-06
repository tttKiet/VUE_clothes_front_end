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

interface Product {
  _id: string;
  ten_HH: string;
  mo_ta_HH: string;
  gia: number;
  so_luong_hang: number;
  ghi_chu: string;
  createdAt: string;
  ProductImage: ProductImage;
}

interface ProductCart {
  product_id: Product;
  so_luong:number;
  user_id: string;
}

interface IFormState extends Product {
  image: File | UploadFile;
}
interface ProductImage {
  _id: string;
  url: string;
  product_id: string;
}
