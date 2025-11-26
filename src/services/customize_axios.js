import axios from "axios";

const instance = axios.create({
  baseURL: 'https://reqres.in/api/',
  timeout: 1200,
  headers: {'x-api-key': 'reqres-free-v1'}
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lies within the range of 2xx causes this function to trigger
    // Do something with response data
    console.log(response  )
    return response.data ? response.data : {statusCode : response.status};
  }, function (error) {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default instance;