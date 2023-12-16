import { CONFIG } from 'Src/config';
import { Message } from '../types';
import { request } from '../utils/request';
import { actions, getState } from './redux';

interface TopicTrending {
    id: string;
    text: string;
    category: string;
    position: number;
    is_popular: boolean;
    is_trending: boolean;
    created_at: string;
    updated_at: string;
}

export default {
    state: {
        updateCard: {} as Record<string, Message>,
        mainnetIsConnect: false,
        topicTrending: [] as TopicTrending[],
    },
    actions: {
        async updateCard(data: string | Message) {
            if (typeof data === 'string') {
                const [, res] = await request<Message>({
                    url: `${CONFIG.API_HOST}/messages/${data}`,
                    method: 'get',
                });
                if (res && res.id) {
                    actions.common.setState({
                        updateCard: { ...getState('common').updateCard, [data]: res },
                    });
                }
            } else {
                actions.common.setState({
                    updateCard: { ...getState('common').updateCard, [data.id]: data },
                });
            }
        },
        async getTopicTrending() {
            const [, res] = await request<TopicTrending[]>({
                url: `${CONFIG.API_HOST}/topics/trending`,
            });
            if (res) {
                actions.common.setState({
                    topicTrending: res.map((v) => ({
                        ...v,
                        text: `#${v.text}`,
                    })),
                });
            }
        },
    },
};
