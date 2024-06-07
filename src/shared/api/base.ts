import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {API_URL} from "./config";

class AxiosClientApi {
    private session: AxiosInstance

    constructor(apiUrl: string = API_URL) {
        this.session = axios.create({
            baseURL: apiUrl,
            headers: {
                'Accept-Language': 'ru-RU,ru;',
            },
        });

        this.session.interceptors.request.use((config) => {
            const authToken = localStorage.getItem("token");

            const auth = authToken ? `Bearer ${authToken}` : null;

            config.headers.set('Authorization', auth)
            return config;
        });
    }

    public async get<TResponse>(
        url: string, config?:  AxiosRequestConfig
    ): Promise<AxiosResponse<TResponse>> {
        try {
            return await this.session.get(url, config);
        } catch (error) {
            await this.handleError<TResponse>(error);
            throw error;
        }
    }
    public async post<TRequest, TResponse>(
        url: string, params: TRequest, config?: AxiosRequestConfig
    ): Promise<AxiosResponse<TResponse>> {
        try {
            return await this.session.post(url, params, config)
        } catch (error) {
            await this.handleError<TResponse>(error);
            throw error;
        }
    }

    public async put<TRequest>(
        url: string, params?: TRequest, config?: AxiosRequestConfig
    ): Promise<AxiosResponse> {
        try {
            return await this.session.put(url, params, config)
        } catch (error) {
            await this.handleError<any>(error);
            throw error;
        }
    }

    public async delete(
        url: string, config?: AxiosRequestConfig
    ): Promise<AxiosResponse> {
        try {
            return await this.session.delete(url, config)
        } catch (error) {
            await this.handleError<any>(error);
            throw error;
        }
    }

    private async handleError<TRequest>(error: unknown) {
        const axiosError = error as AxiosError<TRequest>;

        if (!axiosError) return;
    }
}

export const axiosClient = new AxiosClientApi();