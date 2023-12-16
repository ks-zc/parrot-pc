import React from 'react';
import { createRoot } from 'react-dom/client';
import store from 'Models/index';
import { Provider, actions } from 'Models/redux';
import { CONFIG } from 'Src/config';
import { localStorageGet } from './utils';
import Home from './pages/home';
import NFT from './pages/nft';

localStorageGet(CONFIG.PARROT_USER).then((res) => {
    actions.user.setState({ userInfo: JSON.parse(res || '{}') });
    const root = document.createElement('div');
    document.documentElement.appendChild(root);
    const C = window.location.href.includes('/nft') ? NFT : Home;
    createRoot(root).render(
        <Provider store={store}>
            <C />
        </Provider>,
    );
});
