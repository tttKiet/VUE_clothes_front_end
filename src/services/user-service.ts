import axios from "@/axios";
import Api from "./const.api";

class UserService {
  async register(data: User) {
    return await axios.post<ResData<User>>("/api/v1/create-user", data);
  }

  async orderProductInCart({
    dia_chi_nhan,
    productCartIds,
    so_dien_thoai_dat_hang,
  }: {
    productCartIds: string[];
    so_dien_thoai_dat_hang: string;
    dia_chi_nhan: string;
  }) {
    return await axios.post<ResData<OrderBill>>(Api.API_ORDER, {
      cart_product_ids: productCartIds,
      so_dien_thoai_dat_hang,
      dia_chi_nhan,
    });
  }

  async orderOnlyProduct({
    dia_chi_nhan,
    so_luong,
    size,
    so_dien_thoai_dat_hang,
    product_id,
  }: {
    so_luong: number;
    size: Sizes;
    so_dien_thoai_dat_hang: string;
    dia_chi_nhan: string;
    product_id: string;
  }) {
    return await axios.post<ResData<OrderBill>>(`${Api.API_ORDER}/one-item`, {
      dia_chi_nhan,
      so_luong,
      size,
      product_id,
      so_dien_thoai_dat_hang,
    });
  }

  async getOrderBill() {
    return await axios.get<ResData<OrderBill[]>>(Api.API_ORDER);
  }

  async getOrderDetail(_id: string) {
    return await axios.get<ResData<OrderBill>>(`${Api.API_ORDER}/${_id}`);
  }

  async cancelOrder(_id: string) {
    return await axios.patch<ResData>(`${Api.API_ORDER}/${_id}`);
  }
}

const userService = new UserService();
export default userService;
