import axios from "axios";
import { API_ENDPOINT } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    const token = await AsyncStorage.getItem("token");
    if (token) {
      Object.assign(this.requestOptions.headers, {
        Authorization: `${token}`,
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

  // Handle Post request
  static async put(url: string, payload: any, isPrivate = true) {
    this.requestOptions.method = "PUT";
    const token = await AsyncStorage.getItem("token");
    if (token) {
      Object.assign(this.requestOptions.headers, {
        Authorization: `${token}`,
      });
    }

    return axios
      .put(`${API_ENDPOINT}${url}`, payload, this.requestOptions)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        throw Error(error.response?.data?.message ?? error.message);
      });
  }

  // Handle get request.
  static async get(url: string, params: any, isPrivate = true) {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      Object.assign(this.requestOptions.headers, {
        Authorization: `${token}`,
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
