/* eslint-disable no-unsafe-finally */
/* eslint-disable no-restricted-globals */
import { BrowserProvider, ethers } from 'ethers';
import { SiweMessage } from 'siwe';

const isPro = window.location.href.includes('isPro=1');
const API_HOST = isPro ? 'https://api.parrot.buzz' : 'https://api.staging.parrot.buzz';
const NETWORK = isPro ? 'homestead' : 'sepolia';
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

async function signInWithEthereum(id: number) {
    if (!mainnetIsConnect) {
        await connectMainNet(0);
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
        const data = { id, message: res.statusText, code: res.status };
        parent.postMessage(JSON.stringify(data), '*');
        return data;
    }
    const data = await res.json();
    if (data.code !== 0) {
        data.id = id;
        parent.postMessage(JSON.stringify(data), '*');
        return data;
    }
    const data1 = { code: 0, id, data: { address, token: data.data.token } };
    parent.postMessage(JSON.stringify(data1), '*');
    return data1;
}

const claimSeed = async (id: number, data: { amount: number; deadline: number; signature: string }) => {
    const provider = new ethers.AlchemyProvider(NETWORK, 'l3hDguWjU2ioFw4VRev6J4UOu1CL3cLg');
    const { gasPrice: baseGasPrice } = await provider.getFeeData();
    const { amount, deadline, signature } = data;

    const browserProvider = new BrowserProvider(window.ethereum, 'any');
    const signer = await browserProvider.getSigner();

    const registrarContract = new ethers.Contract(
        '0x9b2D2FA0db465C5E12F8e95B125D27c70c3F79cA',
        require('./one.json').abi,
        signer,
    );

    const baseGasLimit = await (registrarContract.connect(signer) as any).claimSeed.estimateGas(
        amount,
        deadline,
        signature,
    );
    const gasLimit = (baseGasLimit * 12n) / 10n;
    const gasPrice = ((baseGasPrice || 0n) * 15n) / 10n;

    const result = await registrarContract.claimSeed(amount, deadline, signature, {
        gasPrice,
        gasLimit,
    });
    const data1 = { code: 0, id, data: result };
    parent.postMessage(JSON.stringify(data1), '*');
    return data1;
};

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

async function connectMainNet(id: number) {
    await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CHAIN_ID }],
    });
    const data = { code: 0, id, data: true };
    parent.postMessage(JSON.stringify(data), '*');
    return data;
}

async function disconnect(id: number) {
    window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
    });
    const data = { code: 0, id, data: null };
    parent.postMessage(JSON.stringify(data), '*');
    return data;
}

window.addEventListener(
    'message',
    (event) => {
        if (typeof event.data === 'object') {
            const { method, params, id } = event.data;
            if (method === 'signInWithEthereum') {
                signInWithEthereum(id);
            } else if (method === 'claimSeed') {
                claimSeed(id, params);
            } else if (method === 'metaMaskIsInstall') {
                onMetaMaskIsInstall((res: boolean) => {
                    parent.postMessage(JSON.stringify({ code: 0, id, data: res }), '*');
                });
            } else if (method === 'mainnetIsConnect') {
                onMainnetIsConnect((res: boolean) => {
                    parent.postMessage(JSON.stringify({ code: 0, id, data: res }), '*');
                });
            } else if (method === 'connectMainNet') {
                connectMainNet(id);
            } else if (method === 'disconnect') {
                disconnect(id);
            }
        }
    },
    false,
);

export { claimSeed, signInWithEthereum, onMetaMaskIsInstall, onMainnetIsConnect, connectMainNet, disconnect };
