export const mySum = (...args) => {
    let total = 0;
    for (const arg of args) {
        total += arg;
    }
    return total;
}