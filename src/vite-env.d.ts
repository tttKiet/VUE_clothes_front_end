/// <reference types="vite/client" />

interface ResData<T = any | []> {
  statusCode: number;
  msg: string;
  data?: T;
}

type Role = "admin" | "user";

interface User {
  _id?: string;
  ho_ten_KH: string;
  password?: string;
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

type Sizes = "XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL";


interface ProductCart {
  _id?:string;
  product_id: Product;
  so_luong:number;
  gia_Dat_hang: number;
  user_id: string;
  size:Sizes;
}

interface IFormState extends Product {
  image: File | UploadFile;
}
interface ProductImage {
  _id: string;
  url: string;
  product_id: string;
}

interface Order {
  _id?: string;
  user_id: User;
  staff_id?: string;
  ngay_dat_hang: Date;
  so_dien_thoai_dat_hang: string;
  dia_chi_nhan: string;
  ngay_giao_hang: Date;
  trang_thai_DH: string;
}


interface OrderDetails {
  _id?: string;
  order_id: string;
  size: string;
  so_luong: number;
  gia_Dat_hang: number;
  giam_gia: number;
  product_id:Product;
}

interface OrderBill {
  order:Order;
  orderDetails:OrderDetails[];
}

