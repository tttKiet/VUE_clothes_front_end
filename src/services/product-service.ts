import axios from "@/axios";
import Api from "./const.api";

class ProductService {
  async createOrUpdateProduct(product: IFormState) {
    var bodyFormData = new FormData();

    bodyFormData.append("ten_HH", product.ten_HH);
    bodyFormData.append("mo_ta_HH", product.mo_ta_HH);
    bodyFormData.append("gia", product.gia.toString());
    bodyFormData.append("so_luong_hang", product.so_luong_hang.toString());
    bodyFormData.append("ghi_chu", product.ghi_chu);
    bodyFormData.append("image", product.image.originFileObj);
    return await axios.post<ResData<Product>>(
      Api.API_ADMIN_PRODUCT,
      bodyFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  }

  async deleteProduct(_id: string) {
    return await axios.delete(Api.API_ADMIN_PRODUCT, {
      data: {
        _id: _id,
      },
    });
  }

  async getProduct() {
    return await axios.get(Api.API_ADMIN_PRODUCT);
  }
}

const productService = new ProductService();
export default productService;
