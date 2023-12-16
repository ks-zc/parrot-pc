import { CONFIG } from 'Src/config';
import { actions, getState } from './redux';
import { request } from '../utils/request';
import { Require, invoke, localStorageSet } from '../utils';

interface UserInfo {
    token?: string;
    address?: string;
    availableSeeds?: number;
    twitterUserName?: string;
    isTwitterLinked?: boolean;
    isTwitterExpired?: boolean;
    profileImageUrl?: string;
    level?: number;
}

interface Claime {
    amount: number;
    transactionHash: string;
    url: string;
    claimedAt: string;
}
interface Seeds {
    total: number;
    claimed: number;
    available: number;
    pending: number;
}

interface Item {
    category: string;
    id: string;
    text: string;
    message_count: number;
}

export default {
    state: {
        followList: [] as Item[],
        userInfo: {} as UserInfo,
        claimedList: [] as Claime[],
        seeds: {
            total: 0,
            claimed: 0,
            available: 0,
            pending: 0,
        },
        page: __DEV__ ? 'Home' : 'Home',
        homeTab: '/messages/newest',
    },
    actions: {
        logout: () => {
            actions.user.setUserInfo({});
            actions.user.setState({ followList: [] });
            localStorageSet(CONFIG.PARROT_USER_FOLLOW, '[]');
            invoke('disconnect', () => {});
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
                            1: Require('profile0.png'),
                            2: Require('profile0.png'),
                        }[res.level!] || Require('profile0.png');
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
        getFollowing: async () => {
            if (!getState('user').userInfo.token) {
                return;
            }
            await request<Item[]>({
                url: `${CONFIG.API_HOST}/topics/following`,
            }).then(([, res]) => {
                if (res) {
                    actions.user.setState({ followList: res });
                    localStorageSet(CONFIG.PARROT_USER_FOLLOW, JSON.stringify(res));
                }
            });
        },
        getClaime: async () => {
            if (!getState('user').userInfo.token) {
                return;
            }
            await request<{ list: Claime[]; seeds: Seeds }>({
                url: `${CONFIG.API_HOST}/claimed_seeds`,
            }).then(([, res]) => {
                if (res) {
                    actions.user.setState({ claimedList: res.list, seeds: res.seeds });
                }
            });
        },
    },
};
