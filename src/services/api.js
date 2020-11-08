import axios from "axios";
import { getToken, getRefreshToken, setSession} from "./auth";
import { toast } from "react-toastify";

export const url = "http://localhost:3333"

const api = axios.create({
  baseURL: url
});

function toastError(text){
  toast.error(text, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });
}
function toastSuccess(text){
  toast.success(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  });
}
console.log('%cEspere!', 'padding:10px 0 0 0 ;font-size: 3em; color: red;');
console.log('%cEste é um recurso de navegador voltado para desenvolvedores!', 'color: grey; padding:10px 0 0 0px; font-size: 15px;');

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(undefined, err => {
  return new Promise((resolve, reject) => {
    const originalReq = err.config;
    if(err.message === 'Network Error' && !err.response)
    {
      toastError('Ops! ocorreu um erro na conexão com o servidor. Entre em contato com o administrador do sistema.')
      return
    }
    else if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest )
    {
        originalReq._retry = true;

        let res = fetch('http://127.0.0.1:3333/refresh', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Device': 'device',
                'Token': getToken()
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify({
                token: getToken(),
                refresh_token: getRefreshToken()
            }),
        }).then(res => res.json()).then(res => {
            setSession(res.token, res.refreshToken);
            originalReq.headers['Token'] = res.token;
            originalReq.headers['Device'] = "device";
            toastSuccess('Sua sessão expirou. Por favor, atualize a pagina!')
            return axios(originalReq);
        });
        resolve(res);
    }
    else if(err.response.status === 500){
      toastError('Ops! ocorreu um erro de servidor. Verifique o terminal para mais informações.')
      return
    }
    else if(err.response.status === 400){
      toastError(err.response.data)
      return
    }
    else if(err.response.status === 422){
      toastError(err.response.data[0].message)
      return
    }
    else if(err.response.status === 403){
      toastError(err.response.data)
      return
    }
    
    return Promise.reject(err);
  });
})

export default api;
