const cooldownTime: number = 4000;

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export { sleep, cooldownTime }