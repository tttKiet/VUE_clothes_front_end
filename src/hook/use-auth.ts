import axios from "@/axios";
// import axios from "axios";
import { userLoginStore } from "@/pinia/store";
import { computed, reactive, ref, watch } from "vue";
interface TokenPayloadLogin extends UserLogin {
  accessToken: string;
}
export function useAuth() {
  const {
    login: saveLoginToStore,
    logout: logoutToStore,
    user,
    saveToken,
    saveProfile,
  } = userLoginStore();

  // access_token_local_storage
  const access_token_local_storage = window.localStorage.getItem("accessToken");
  const access_token = access_token_local_storage
    ? JSON.parse(access_token_local_storage)
    : "";

  if (access_token) {
    saveToken(access_token);
  }

  const userLogin = ref<UserLogin>({
    _id: user._id,
    ho_ten_KH: user._ho_ten_KH,
    dia_chi: user._dia_chi,
    role: user._role,
    so_dien_thoai: user._so_dien_thoai,
  });

  // Fetch profile
  axios
    .get<ResData<UserLogin>>("/api/v1/auth/profile")
    .then((response) => {
      console.log(response.data);
      if (response.status === 200) {
        userLogin.value = {
          _id: response.data?.data?._id!,
          ho_ten_KH: response?.data?.data?.ho_ten_KH!,
          role: response?.data?.data?.role!,
          dia_chi: response?.data?.data?.dia_chi!,
          so_dien_thoai: response?.data?.data?.so_dien_thoai!,
        };
        saveProfile({
          _id: response?.data?.data?._id!,
          ho_ten_KH: response?.data?.data?.ho_ten_KH!,
          role: response?.data?.data?.role!,
          dia_chi: response?.data?.data?.dia_chi!,
          so_dien_thoai: response?.data?.data?.so_dien_thoai!,
        });
      }
    })
    .catch((error) => {
      console.log("error", error);
    });

  // axios
  //   .get<UserLogin>("/api/v1/auth/profile")
  //   .then((response) => {
  //     console.log("response", response);
  //     saveProfile({
  //       _id: response.data._id,
  //       ho_ten_KH: response.data.ho_ten_KH,
  //       role: response.data.role,
  //       dia_chi: response.data.dia_chi,
  //       so_dien_thoai: response.data.so_dien_thoai,
  //     });

  //     userStoreRef.value = userLoginStore();

  //   })
  //   .catch((error) => {
  //     console.log("error", error);
  //   });
  async function login({
    so_dien_thoai,
    password,
  }: {
    so_dien_thoai: string;
    password: string;
  }) {
    try {
      const res = await axios.post<ResData<TokenPayloadLogin>>(
        "/api/v1/auth/login",
        {
          so_dien_thoai,
          password,
        },
      );

      if (res.status === 200) {
        saveLoginToStore({
          accessToken: res.data.data?.accessToken!,
          data: {
            ...res.data.data!,
          },
        });
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    try {
      const res = await axios.delete<ResData>("/api/v1/auth/logout");
      if (res.status === 200) {
        logoutToStore();
      }
    } catch (error) {
      console.log(error);
    }
  }

  watch(
    () => userLoginStore().user,
    (newUser) => {
      userLogin.value = {
        _id: newUser._id,
        ho_ten_KH: newUser._ho_ten_KH,
        dia_chi: newUser._dia_chi,
        role: newUser._role,
        so_dien_thoai: newUser._so_dien_thoai,
      };
    },
  );
  return {
    login,
    user: userLogin,
    logout,
  };
}
