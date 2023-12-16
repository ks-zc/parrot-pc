import React from 'react';
import { createRoot } from 'react-dom/client';
import store from 'Models/index';
import { Provider, actions } from 'Models/redux';
import { CONFIG } from 'Src/config';
import { localStorageGet } from './utils';
import Home from './pages/home';
import NFT from './pages/nft';
import './reset.scss';

localStorageGet(CONFIG.PARROT_USER).then((res) => {
    actions.user.setState({ userInfo: JSON.parse(res || '{}') });
    const C = window.location.href.includes('/nft') ? NFT : Home;
    createRoot(document.querySelector('#app')!).render(
        <Provider store={store}>
            <C />
        </Provider>,
    );
});
