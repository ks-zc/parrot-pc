/* eslint-disable no-unsafe-finally */
/* eslint-disable no-restricted-globals */
import { BrowserProvider } from 'ethers';
import { SiweMessage } from 'siwe';

const isPro = window.location.href.includes('isPro=1');
const API_HOST = isPro ? 'https://api.parrot.buzz' : 'https://api.staging.parrot.buzz';
const CHAIN_ID = isPro ? '0x1' : '0xaa36a7';

declare global {
    interface Window {
        ethereum: any;
    }
}

function createSiweMessage(address: string, statement: string) {
    return new SiweMessage({
        domain: window.location.host,
        address,
        statement,
        uri: window.location.origin,
        chainId: 1,
        version: '1',
    }).prepareMessage();
}

async function signInWithEthereum() {
    if (!mainnetIsConnect) {
        await connectMainNet();
    }
    const provider = new BrowserProvider(window.ethereum, 'any');
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const message = createSiweMessage(address, 'Sign in with Ethereum to the app.');
    const signature = await signer.signMessage(message);
    const res = await fetch(`${API_HOST}/auth/siwe`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
    });
    if (!res.ok) {
        return { message: res.statusText, code: res.status };
    }
    const data = await res.json();
    if (data.code !== 0) {
        return data;
    }
    return { code: 0, data: { address, token: data.data.token } };
}

let metaMaskIsInstall: boolean;
function onMetaMaskIsInstall(cb: Function) {
    setInterval(() => {
        if (metaMaskIsInstall !== window.ethereum.isMetaMask) {
            metaMaskIsInstall = window.ethereum.isMetaMask;
            cb(metaMaskIsInstall);
        }
    }, 200);
}

let mainnetIsConnect: boolean;
function onMainnetIsConnect(cb: Function) {
    setInterval(async () => {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        const mainnetIsConnect1 = chainId === CHAIN_ID;
        if (mainnetIsConnect !== mainnetIsConnect1) {
            mainnetIsConnect = mainnetIsConnect1;
            cb(mainnetIsConnect);
        }
    }, 500);
}

async function connectMainNet() {
    window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CHAIN_ID }],
    });
}

async function disconnect() {
    window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
    });
}

export { signInWithEthereum, onMetaMaskIsInstall, onMainnetIsConnect, connectMainNet, disconnect };
