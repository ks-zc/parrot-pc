/* eslint-disable no-unsafe-finally */
/* eslint-disable no-restricted-globals */
import { CONFIG } from 'Src/config';
import { request } from 'Src/utils/request';
import { BrowserProvider, ethers } from 'ethers';
import { SiweMessage } from 'siwe';

const isPro = window.location.href.includes('isPro=1');
const API_HOST = isPro ? 'https://api.parrot.buzz' : 'https://api.staging.parrot.buzz';
const CHAIN_ID = isPro ? '0x1' : '0xaa36a7';
const NETWORK = isPro ? 'homestead' : 'sepolia';

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
function onMainnetIsConnect(cb: (mainnetIsConnect: boolean) => void) {
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

const claimSeed = async (levelNum: number) => {
    const [, data] = await request<{
        level: number;
        operation: number;
        signature: string;
    }>({
        url: `${CONFIG.API_HOST}/signature/passport?operation=${levelNum - 1}&level=${levelNum}`,
    });
    if (!data) {
        return;
    }
    const provider = new ethers.AlchemyProvider(NETWORK, 'l3hDguWjU2ioFw4VRev6J4UOu1CL3cLg');
    const { gasPrice: baseGasPrice } = await provider.getFeeData();
    const { level, operation, signature } = data;

    const browserProvider = new BrowserProvider(window.ethereum, 'any');
    const signer = await browserProvider.getSigner();

    const registrarContract = new ethers.Contract(
        '0x9b2D2FA0db465C5E12F8e95B125D27c70c3F79cA',
        require('./two.json').abi,
        signer,
    );

    const baseGasLimit = await (registrarContract.connect(signer) as any).claimSeed.estimateGas(
        amount,
        deadline,
        signature,
    );
    const gasLimit = (baseGasLimit * 12n) / 10n;
    const gasPrice = ((baseGasPrice || 0n) * 15n) / 10n;

    await registrarContract.claimSeed(amount, deadline, signature, {
        gasPrice,
        gasLimit,
    });
};

export { signInWithEthereum, onMetaMaskIsInstall, onMainnetIsConnect, connectMainNet, disconnect, claimSeed };
