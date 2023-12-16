/* eslint-disable no-param-reassign */
export function sleep(ms: number) {
    return new Promise((reslove) => {
        setTimeout(() => {
            reslove(null);
        }, ms);
    });
}

export function strToLink(str: string) {
    const reg = /(https?|ftp|file)(:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/g;
    return str.replace(reg, "<a href='$1$2' target='_blank'>$1$2</a>");
}

export function formatAddress(str?: string) {
    if (!str) {
        return '\u200b';
    }
    return `${str.slice(0, 6)}...${str.slice(-4)}`;
}

export const Require = (id: string) => {
    return require(`Assets/${id}`);
};

export async function localStorageSet(key: string, data: string) {
    if (__DEV__) {
        localStorage.setItem(key, data);
    } else {
        await chrome.storage.local.set({ [key]: data });
    }
}

export async function localStorageGet(key: string) {
    if (__DEV__) {
        return localStorage.getItem(key);
    }
    const res = await chrome.storage.local.get([key]);
    return res[key] as string;
}

export function getLength(str: string) {
    return str.replace(/[\u0391-\uFFE5]/g, 'aa').length;
}

export function formatNum(num: number | string) {
    const num1 = Number(num);
    if (!num) {
        return 0;
    }
    if (num1 > 999999) {
        return `${Number(Math.floor(num1 / 100000) / 10).toFixed(1)}m`;
    }
    if (num1 > 999) {
        return `${Number(Math.floor(num1 / 100) / 10).toFixed(1)}k`;
    }
    return num1.toFixed(1);
}

export function checkMaxLength(str: string, length: number) {
    let strLen = 0;
    let res = '';
    for (let i = 0; i < str.length; i++) {
        if (/[\u0391-\uFFE5]/.test(str[i])) {
            strLen += 2;
        } else {
            strLen += 1;
        }
        if (strLen <= length) {
            res += str[i];
        }
    }
    return res;
}

export function throttle<T extends Function>(fn: T, delay: number = 750) {
    let lastTime = 0;
    return ((...args: any) => {
        if (Date.now() - lastTime > delay) {
            fn(...args);
            lastTime = Date.now();
        }
    }) as unknown as T;
}
