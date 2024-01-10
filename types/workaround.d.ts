declare const __DEV__: boolean;
declare const API_HOST: string;

declare module '*.scss' {
    const content: { [key: string]: any };
    export = content;
}
