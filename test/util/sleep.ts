
export function Sleep(timeout: number) {
    console.log('sleeping for', timeout)
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}