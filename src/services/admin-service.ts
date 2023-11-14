import axios from "@/axios";
import Api from "./const.api";

class AdminService {
  async getOrder() {
    return await axios.get<ResData<OrderBill[]>>(Api.API_ADMIN_ORDER);
  }
  async changeStatusOrder(data: { order_id: string; status: string }) {
    return await axios.patch<ResData>(Api.API_ADMIN_ORDER, data);
  }
}

const adminService = new AdminService();
export default adminService;
