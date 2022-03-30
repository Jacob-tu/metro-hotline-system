import { extend } from 'umi-request';
import { notification } from 'antd';
import { getToken } from '@/utils/auth';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队 (异步任务) 。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限 (令牌、用户名、密码错误) 。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// 异常处理程序
const errorHandler = function (error) {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求出错 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      message: '网络异常',
      description: '您的网络发生异常，无法连接服务器',
    });
  }
  return response;
};

// 配置 request 请求时的默认参数
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上 cookie
  prefix: 'http://localhost:8080', // 请求的基地址
});

// 请求拦截器，在请求之前添加请求头headers，用于身份认证
request.interceptors.request.use((url, options) => {
  const token = getToken();
  const headers = {
    'X-Token': `${token}`,
  };

  return {
    url,
    options: { ...options, headers },
  };
});

export default request;
