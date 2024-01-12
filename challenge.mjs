
const dataQueue = [];

export async function blockingGet(key) {
    return new Promise((resolve, reject) => {
        dataQueue.push({ key, resolve, reject })

        const timer = setInterval(() => {
            const index = dataQueue.findIndex(item => item.key === key);
            if (index != -1) {
                dataQueue.splice(index, 1);
            }
            clearInterval(timer);
            resolve(null);
        }, 30000);
    });
}

export async function push(key, data) {
    const index = dataQueue.findIndex(item => item.key === key);
    if (index != -1) {
        const { resolve } = dataQueue.splice(index, 1)[0];
        resolve(data);
    }
}
