export const validationEmail = (value) => {
	let newError = null;
	if (!/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(value)) {
		newError = "Почта должна быть в формате - email@example.com";
	}
	return newError;
};
