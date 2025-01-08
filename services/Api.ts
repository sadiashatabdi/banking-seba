import axios from "axios";
import { API_ENDPOINT } from "@/config";

class Api {
  static requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  // Handle Post request
  static async post(url: string, payload: any, isPrivate = true) {
    this.requestOptions.method = "POST";
    if (isPrivate) {
      //   const user = store.getState();
      Object.assign(this.requestOptions.headers, {
        // "X-Authorization": `Bearer ${user.auth.user?.access_token}`,
      });
    }

    return axios
      .post(`${API_ENDPOINT}${url}`, payload, this.requestOptions)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        throw Error(error.response?.data?.message ?? error.message);
      });
  }

  // Handle get request.
  static async get(url: string, params: any, isPrivate = true) {
    if (isPrivate) {
      //   const user: RootState = store.getState();
      Object.assign(this.requestOptions.headers, {
        // "X-Authorization": `Bearer ${user.auth.user?.access_token}`,
      });
    }

    if (params) {
      Object.assign(this.requestOptions, { params });
    }

    return axios
      .get(`${API_ENDPOINT}${url}`, this.requestOptions)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        throw Error(error.response.data.message ?? error.message);
      });
  }
}

export default Api;
