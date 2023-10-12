import axios from "axios";
const AxiosClient = axios.create({
    baseURL: "http://localhost:8080"
  });

  const authRequestInterceptor = (
    config ) => {
    // getting accessToken from local storage
    // maybe accessToken should be stored in cookies instead
    const accessToken = window.localStorage.getItem("access_token");
  
    if (accessToken) {
      if (config.headers) {
        config.headers["Authorization"] = `${accessToken}`;
      }
    }
    return config;
  };
  
  AxiosClient.interceptors.request.use(authRequestInterceptor);
  export default AxiosClient