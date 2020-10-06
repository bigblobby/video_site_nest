export const composeClassNames = (...args: any[]): string => {
    let classNames = [];

    args.forEach(arg => {
        if(!arg) return;

        if(typeof arg === 'object') {
            classNames = [...classNames, ...Object.values(arg)]
        } else {
            classNames.push(arg);
        }
    });

    return classNames.join(' ');
}
