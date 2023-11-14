import axios, { AxiosResponse } from "axios";
import { POSITION, TYPE, useToast } from "vue-toastification";
const toast = useToast();
function getErrorMessage(err: unknown): string {
  let msg = "";
  if (axios.isAxiosError(err)) {
    if (err.response) {
      msg = err.response.data.msg;
    } else {
      msg = "Lỗi không có phản hồi từ server";
    }
  } else {
    const errorWithMsg = err as { msg?: string };
    msg = errorWithMsg.msg || "Lỗi không xác định";
  }

  return msg;
}

async function toastMsgFromPromise(
  api: Promise<AxiosResponse<ResData, any>>,
): Promise<any> {
  try {
    const res = await api;
    console.log("res--------------------", res);
    if (res.status === 200) {
      console.log("l1--------------------");

      toast(res.data?.msg || "Thành công", {
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        position: POSITION.TOP_RIGHT,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
      });
    } else {
      toast(res.data.msg, {
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        position: POSITION.TOP_RIGHT,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
      });
    }
    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        const errorMsg = err.response.data.message;
        toast(errorMsg, {
          type: TYPE.ERROR,
          timeout: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          position: POSITION.TOP_RIGHT,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: false,
          closeButton: "button",
          icon: true,
        });
      } else {
        toast("Lỗi không có phản hồi từ server", {
          type: TYPE.ERROR,
          timeout: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          position: POSITION.TOP_RIGHT,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: false,
          closeButton: "button",
          icon: true,
        });
      }
    } else {
      const errorWithMsg = err as { message?: string };
      const errorMsg = errorWithMsg.message || "Lỗi không xác định";
      toast(errorMsg, {
        type: TYPE.ERROR,
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        position: POSITION.TOP_RIGHT,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
      });
    }

    return false;
  }
}

export { getErrorMessage,toastMsgFromPromise };
