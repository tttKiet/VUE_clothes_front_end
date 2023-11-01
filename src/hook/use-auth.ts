import axios from "@/axios";
// import axios from "axios";
import { userLoginStore } from "@/pinia/store";
export function useAuth() {
  const { login: saveLoginToStore, user, saveToken } = userLoginStore();
  const access_token_local_storage = window.localStorage.getItem("accessToken");
  const access_token = access_token_local_storage
    ? JSON.parse(access_token_local_storage)
    : "";

  if (access_token) {
    saveToken(access_token);
  }

  axios
    .get("/api/v1/auth/profile")
    .then((response) => {
      console.log("response", response);
    })
    .catch((error) => {
      console.log("error", error);
    });
  async function login({
    so_dien_thoai,
    password,
  }: {
    so_dien_thoai: string;
    password: string;
  }) {
    try {
      const res = await axios.post<
        ResData<{
          accessToken: string;
        }>
      >("/api/v1/auth/login", {
        so_dien_thoai,
        password,
      });

      if (res.status === 200) {
        saveLoginToStore({
          accessToken: res.data.data?.accessToken || "",
          data: {
            _id: "res.data.data",
          },
        });

        return res.data;
      }

      console.log("res", res);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    login,
    user,
  };
}
