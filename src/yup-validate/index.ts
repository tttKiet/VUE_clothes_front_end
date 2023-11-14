import * as yup from "yup";

export const loginValidate = yup.object().shape({
  phone: yup.string().required("Vui lòng điền số điện thoại"),
  password: yup.string().required("Vui lòng điền mật khẩu"),
});

export const registerValidate = yup.object().shape({
  ho_ten_KH: yup.string().required("Vui lòng điền họ và tên"),
  phone: yup.string().required("Vui lòng điền số điện thoại"),
  dia_chi: yup.string().required("Vui lòng điền địa chỉ"),
  password: yup.string().required("Vui lòng điền mật khẩu"),
  "re-password": yup
    .string()
    .required("Vui lòng nhập lại mật khẩu.")
    .test("match", "Mật khẩu nhập lại không đúng.", function (value) {
      return value === this.parent.password;
    }),
});
