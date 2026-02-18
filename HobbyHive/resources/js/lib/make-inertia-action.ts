export function makeInertiaAction(method: string, url: string) {
    return {
        form: () => ({
            method: method as 'get' | 'post' | 'put' | 'patch' | 'delete',
            action: url,
        }),
    };
}