import axios from "axios";

// export const baseUrl = "http://localhost:4500";
export const baseUrl = "https://fincta-backend.herokuapp.com";
const instance = axios.create();
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("fincta_token");
  console.log("token => " + token);
  if (token) {
    config.headers.authorization = token;
    // return config;
  }
  return config;
});

export default instance;
