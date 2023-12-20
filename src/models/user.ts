import { CONFIG } from 'Src/config';
import { disconnect } from 'Src/metamask';
import { actions, getState } from './redux';
import { request } from '../utils/request';
import { localStorageSet } from '../utils';

interface UserInfo {
    token?: string;
    address?: string;
    availableSeeds?: number;
    twitterUserName?: string;
    isTwitterLinked?: boolean;
    isTwitterExpired?: boolean;
    profileImageUrl?: string;
    l2Eligible?: boolean;
    level?: number;
}

export default {
    state: {
        userInfo: {} as UserInfo,
        mainnetIsConnect: false,
    },
    actions: {
        logout: () => {
            actions.user.setUserInfo({});
            localStorageSet(CONFIG.PARROT_USER_FOLLOW, '[]');
            disconnect();
        },
        getUserInfo: async () => {
            if (!getState('user').userInfo.token) {
                return;
            }
            const [, res] = await request<UserInfo>({
                url: `${CONFIG.API_HOST}/user`,
            });
            if (res) {
                if (!res.profileImageUrl) {
                    res.profileImageUrl =
                        {
                            1: require('Assets/profile0.png'),
                            2: require('Assets/profile0.png'),
                        }[res.level!] || require('Assets/profile0.png');
                }
                actions.user.updateUserInfo(res);
            }
        },
        setUserInfo: (data: UserInfo) => {
            actions.user.setState({ userInfo: data });
            localStorageSet(CONFIG.PARROT_USER, JSON.stringify(data));
        },
        updateUserInfo: (data: Partial<UserInfo>) => {
            actions.user.setUserInfo({ ...getState('user').userInfo, ...data });
        },
    },
};
