import axios, { AxiosAdapter, AxiosInstance } from 'axios';
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';

const cachedApi = (baseUrl: string): AxiosInstance =>
    axios.create({
        baseURL: baseUrl,
        headers: { 'Cache-Control': 'no-cache' },
        adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter)),
    });

export default cachedApi;
