import { axiosInstance } from '../../axiosInstance';

export const apiService = {
    shortenUrl: async (body) => {
        const { data } = await axiosInstance.post('/shorten', { ...body });
        return data;
    },
    isArrayMonotonic: async (body) => {
        const { data } = await axiosInstance.post('/array-monotonic', { ...body });
        return data;
    },
};
