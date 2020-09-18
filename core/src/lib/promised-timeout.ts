/**
 * @description Отклоняет обещание, если оно не соответствует
 * указанному времни ожидания.
 * @param {Promise} promise
 * @param {number} timeoutMillis
 * @param {errHandler} errHandler
 * @returns {Promise} promise
 */
export const PromisedTimeout = (promise:Promise<any>, timeoutMillis:number):Promise<any> | Error => {
	let error,
        timeout
        
	return Promise.race([
		promise,
		new Promise(function (resolve, reject) {
			timeout = setTimeout(function () {
				reject(error);
			}, timeoutMillis);
		}),
	]).then(
		function (v) {
			clearTimeout(timeout);
			return v;
		},
		function (err) {
			clearTimeout(timeout);
			throw err;
		},
	);
};
