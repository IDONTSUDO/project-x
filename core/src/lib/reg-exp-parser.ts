import { PromisePool } from "./PromisePool";

import * as fs from 'fs'
import * as path from 'path';
import { promisify } from 'util';


const fs_readDir = promisify(fs.readdir);
const fs_stat = promisify(fs.stat);
/**
 * @problem Поиск файлов в файловой системе по RegExp выражению. 
 * @param {baseDir}  Базовая директория в которой нужно искать.
 * @param {pattern}  Regexp выражение для файлов.
 * @param {depth}  Число погружений.
 * @param {options} options.concurrency Количество одновременных поисков по папкам.
 * @return {Promise.<ResultFiles>}
 */
export async function FindFiles(baseDir = path.resolve('../../'), pattern = '.*', depth = 0, options: any = {}): Promise<any> {
    const { concurrency = 10 } = options;

    const result = [];
    depth > -1 && await search(path.resolve(baseDir), typeof pattern === 'string' ? new RegExp(pattern) : pattern, depth, result, concurrency);
    return result;
}


/**
 * @problem Основная функция поиска.
 * @param {dir}  Базовая директория в которой нужно искать.
 * @param {regex}  Regexp выражение для файлов.
 * @param {depth}  Число погружений.
 * @param {result} options.concurrency Количество одновременных поисков по папкам.
 * @return {concurrency}
 */
async function search(dir, regex, depth, result: any = [], concurrency) {
    async function fileAnalyzer(file) {
        const filePath = path.join(dir, file);
        const stat = await fs_stat(filePath);

        if (stat.isFile() && regex.test(regex.global ? filePath : file)) {
            result.push({ dir, file });
        } else if (stat.isDirectory() && depth > 0) {
            await search(filePath, regex, depth - 1, result, concurrency);
        }
        regex.lastIndex = 0;
    }

    const folderContents = await fs_readDir(dir);
    return PromisePool(folderContents, fileAnalyzer, concurrency);
}
