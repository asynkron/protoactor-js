
export function Sleep(timeout: number) {
    console.log('sleeping for', timeout)
    return new Promise(function (resolve) {
        setTimeout(resolve, timeout);
    });
}