# backend-code-templates
在不同分支存放各种后端代码模板，在 foursheep-cli 脚手架中使用

前端使用 axios 进行数据发送时，要存储 jwt 的 token
```shell
import axios from 'axios';
axios.defaults.withCredentials = true;

// 将 token 放到拦截器里面处理
axios.interceptors.request.use(function (config) {
  const requestToken = getCookie('token'); // 获取我们存储的 token
  config.headers['Authorization'] = 'Bearer ' + requestToken; // 将 token 放到 header 里面
  config.headers.post['Content-Type'] = 'application/json';
  config.timeout = 60000;
  return config;
});
```
