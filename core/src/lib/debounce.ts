/**@description помогает воспроизводить функцию/метод строго в ограниченное время 1 раз
 * @param { f } async_function
 * @param { ms }  number
 * @return { function }
 */
export const debounce = (f:Function, ms:number) => {
	let isCooldown = false;

	return async function () {
		if (isCooldown) return;
		let res = await f
		res.apply(this, arguments);

		isCooldown = true;

		setTimeout(() => (isCooldown = false), ms);
	};
};