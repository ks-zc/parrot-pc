export function to<T extends Promise<any>>(fn: T) {
    return new Promise<[Error, undefined] | [undefined, Awaited<T>]>((resolve) => {
        fn.then((data) => {
            resolve([undefined, data]);
        }).catch((err) => {
            resolve([err, undefined]);
        });
    });
}
