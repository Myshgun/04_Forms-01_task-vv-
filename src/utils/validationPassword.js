export const validationPassword = (value, password) => {
	let newError = null;
	if (
		!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
			value
		) &&
		value !== password
	) {
		newError =
			"Пароль должен содержать минимум 8 символов, минимум одну цифру, одну заглавную и строчную латинские буквы, один спецсимвол";
	}
	return newError;
};
