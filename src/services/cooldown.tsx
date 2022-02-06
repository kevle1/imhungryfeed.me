const cooldownTime: number = 1000;

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export { sleep, cooldownTime }