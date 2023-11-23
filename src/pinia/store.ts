import { defineStore } from "pinia";

export interface loginPayload {
  accessToken: string;
  data: UserLogin;
}

export const userLoginStore = defineStore("user", {
  state: () => ({
    _accessToken: "",
    _data: {
      _id: "",
      _ho_ten_KH: "",
      _role: "user" as Role,
      _dia_chi: "",
      _so_dien_thoai: "",
    },
  }),
  getters: {
    accessToken(state) {
      // autocompletion! ✨
      return state._accessToken;
    },
    user(state) {
      return state._data;
    },
  },
  actions: {
    setDefault() {
      this._accessToken = "";
      this._data = {
        _id: "",
        _ho_ten_KH: "",
        _role: "user",
        _dia_chi: "",
        _so_dien_thoai: "",
      };
    },
    login(payload: loginPayload) {
      this._accessToken = payload.accessToken;
      window.localStorage.setItem(
        "accessToken",
        JSON.stringify(payload.accessToken),
      );
      this._data = {
        _id: payload.data?._id || "",
        _ho_ten_KH: payload.data.ho_ten_KH,
        _so_dien_thoai: payload.data.so_dien_thoai,
        _role: payload.data.role,
        _dia_chi: payload.data.dia_chi,
      };
    },

    saveToken(access_token: string) {
      window.localStorage.setItem("accessToken", JSON.stringify(access_token));
      this._accessToken = access_token;
    },

    saveProfile(payload: UserLogin) {
      this._data = {
        _id: payload?._id || "",
        _ho_ten_KH: payload.ho_ten_KH,
        _so_dien_thoai: payload.so_dien_thoai,
        _role: payload.role,
        _dia_chi: payload.dia_chi,
      };
    },

    logout() {
      window.localStorage.removeItem("accessToken");
      this.setDefault();
    },
  },
});
