import axios from "@/axios";
import Api from "./const.api";

class CartService {
  async addProduct({
    product_id,
    so_luong,
    size,
  }: {
    product_id: string;
    so_luong: number;
    size: Sizes;
  }) {
    return await axios.post<ResData>(Api.API_CART, {
      product_id,
      so_luong,
    });
  }

  async getProduct() {
    return await axios.get<ResData<ProductCart[]>>(Api.API_CART);
  }

  async updateProduct({
    product_id,
    so_luong,
    size,
    size_old,
  }: {
    product_id: string;
    so_luong?: number;
    size?: Sizes;
    size_old?: Sizes;
  }) {
    return await axios.patch<ResData>(Api.API_CART, {
      product_id,
      so_luong,
      size,
      size_old,
    });
  }

  async deleteProduct({ product_id }: { product_id: string }) {
    return await axios.delete<ResData>(Api.API_CART, {
      data: { product_id: product_id },
    });
  }
}

const cartService = new CartService();
export default cartService;
