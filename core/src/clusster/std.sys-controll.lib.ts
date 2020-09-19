
const { networkInterfaces,totalmem } = require('os');

const nets = networkInterfaces();


/**@problem получение Памяти.
 * @return {*} 
 */
export function memoryUsed():String {
    let total_memory = totalmem();
    let total_mem_in_kb = total_memory / 1024;
    let total_mem_in_mb = total_mem_in_kb / 1024;
    let total_mem_in_gb = total_mem_in_mb / 1024;

    total_mem_in_kb = Math.floor(total_mem_in_kb);
    total_mem_in_mb = Math.floor(total_mem_in_mb);
    total_mem_in_gb = Math.floor(total_mem_in_gb);

    total_mem_in_mb = total_mem_in_mb % 1024;
    total_mem_in_kb = total_mem_in_kb % 1024;
    total_memory = total_memory % 1024;
    return "Total memory: " + total_mem_in_gb + "GB "
        + total_mem_in_mb + "MB " + total_mem_in_kb
        + "KB and " + total_memory + "Bytes"
}
/**@problem получение IP.
 * @return {*} 
 */
export function getIp():Object{
    const results = Object.create(null);  

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
    
                results[name].push(net.address);
            }
        }
    }
    return results;
}