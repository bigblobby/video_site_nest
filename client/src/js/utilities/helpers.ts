export function timer(duration){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, duration);
    });
}
