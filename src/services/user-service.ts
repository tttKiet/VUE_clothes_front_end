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

  async getOrderBill(_id: string) {
    return await axios.get<ResData<OrderBill[]>>(Api.API_ORDER);
  }
}

const userService = new UserService();
export default userService;
