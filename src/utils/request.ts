import axios, { AxiosRequestConfig } from 'axios';
import { to } from './to';
import { actions, getState } from '../models/redux';
import Toast from './Toast';

export const request = <T>(config: AxiosRequestConfig<string>) => {
    return to(
        axios({
            ...config,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState('user').userInfo.token}`,
                ...config.headers,
            },
        })
            .then((response) => {
                const { userInfo } = getState('user');
                let { status } = response;

                let message = '';
                if (status === 200) {
                    if (response.data.code === 0 || response.data.status === 'ok') {
                        return response.data.data as T;
                    }
                    status = response.data.code;
                    message = response.data.message;
                    if (status === 22 && !userInfo.isTwitterExpired) {
                        actions.user.setState({ userInfo: { ...userInfo, isTwitterExpired: true } });
                    }
                }
                message && Toast.show(message);
                const err = new Error(message || `code: ${status}`) as any;
                err.code = status;
                throw err;
            })
            .catch((err) => {
                err.response?.data?.message && Toast.show(err.response.data.message);
                if (err.response?.status === 401) {
                    actions.user.logout();
                }
                throw err;
            }),
    );
};
