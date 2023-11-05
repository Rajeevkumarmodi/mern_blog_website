import axios from "axios";
import { useContext } from "react";

export const apiCommanRequest = (method, url, body, header) => {
  const config = {
    method: method,
    url,
    data: body,
    headers: header ? header : { "Content-Type": "application/json" },
  };

  return axios(config)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};
