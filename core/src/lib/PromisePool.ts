/**
 * @problem Контролирует количество одновременных асинхронных операций.
 * @param {Array<any>} Массив с ассинхронными операциями.
 * @param {Function}  Функции для запуска.
 * @param {Number} concurrency Количество одновременных операций.
 * @param {Options} options Варианты контроля исполнения.
 * @returns {Array<Object>}
 */
export const PromisePool = async (arr:any = [], worker:any, concurrency = 1, options:any = {}) => {
    const { stopOnErr = false } = options;
    // TODO:
    const end = arr.length;
    const result:any = [];
    let ind = 0;


    async function runner() {
        if (ind < end) {

            const _ind = ind;

            const item = arr[ind++];

            try {
                result[_ind] = await worker(item, _ind);
            } catch (err) {
                if (stopOnErr) throw new Error(err);
                result[_ind] = err;
            }

            return runner();
        }
    }

    const runners:any = [];
    for (let i = 0; i < concurrency; i++) {
        if (i >= end) break;
        runners.push(runner());
    }

    await Promise.all(runners);
    return result;
}
