export const validationRepeatPassword = (value, password) => {
	let newError = null;
	if (value !== password) {
		newError = "Пароли должны совпадать";
	}
	return newError;
};
