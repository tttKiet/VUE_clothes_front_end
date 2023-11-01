import { defineStore } from "pinia";

export interface loginPayload {
  accessToken: string;
  data: {
    _id: string;
  };
}

export const userLoginStore = defineStore("user", {
  state: () => ({
    _accessToken: "",
    _data: {
      _id: "",
    },
  }),
  getters: {
    accessToken(state) {
      // autocompletion! ✨
      console.log("state", {
        _accessToken: state._accessToken,
      });
      return state._accessToken;
    },
    user(state) {
      return state._data;
    },
  },
  actions: {
    login(payload: loginPayload) {
      this._accessToken = payload.accessToken;
      window.localStorage.setItem(
        "accessToken",
        JSON.stringify(payload.accessToken),
      );
      this._data = { ...payload.data };
    },

    saveToken(access_token: string) {
      window.localStorage.setItem("accessToken", JSON.stringify(access_token));
      this._accessToken = access_token;
    },

    logout() {
      window.localStorage.removeItem("accessToken");
      this._accessToken = "";
      this._data = {
        _id: "",
      };
    },
  },
});
