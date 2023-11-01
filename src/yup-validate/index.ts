import * as yup from "yup";

export const loginValidate = yup.object().shape({
  phone: yup.string().required("Vui lòng điền số điện thoại"),
  password: yup.string().required("Vui lòng điền mật khẩu"),
});
