import React from 'react';
import { createRoot } from 'react-dom/client';
import store from 'Models/index';
import { Provider, actions } from 'Models/redux';
import { CONFIG } from 'Src/config';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { parseQueryString } from './utils';
import Home from './pages/home';
import NFT from './pages/nft';
import './reset.scss';
import './keyframes.scss';
import { onMainnetIsConnect } from './metamask';

if (window.location.pathname.endsWith('/bindx')) {
    const { code, state } = parseQueryString(window.location.href);
    if (code && state) {
        localStorage.setItem(CONFIG.PARROT_BIND_TWITTER, JSON.stringify({ time: Date.now(), code, state }));
        window.close();
    }
} else {
    const res = localStorage.getItem(CONFIG.PARROT_USER);
    actions.user.setState({ userInfo: JSON.parse(res || '{}') });
    onMainnetIsConnect((mainnetIsConnect) => {
        actions.user.setState({ mainnetIsConnect });
    });
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/nft',
            element: <NFT />,
        },
    ]);

    createRoot(document.querySelector('#app')!).render(
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>,
    );
}
