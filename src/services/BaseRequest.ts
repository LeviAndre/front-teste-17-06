import axios, { AxiosInstance } from 'axios';
import { LocalStorageJWT } from './localStorageJwt/LocalStorageJWT';

export default abstract class BaseRequest {
  protected _req: AxiosInstance;

  constructor(baseURL: string) {
    this._req = axios.create({
      baseURL: "http://localhost:5106" + baseURL,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor = () => {
    this._req.interceptors.request.use(
      (config) => {
        const _localStorage = new LocalStorageJWT();
        const token = _localStorage.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  };

  private initializeResponseInterceptor = () => {
    this._req.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  };

  private handleResponse = ({ data }: any) => data;

  protected handleError = (error: any) => Promise.reject(error);
}
