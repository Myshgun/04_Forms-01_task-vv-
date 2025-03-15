import PropTypes from "prop-types";
import { useRef, useState } from "react";
import styles from "./app.module.css";

import {
	validationEmail,
	validationPassword,
	validationRepeatPassword,
} from "./utils";

const AppLayout = ({
	email,
	password,
	repeatPassword,
	emailError,
	passwordError,
	repeatPasswordError,
	handleInput,
	onBlur,
	onSubmit,
	submitButtonRef,
	initialDisabled,
}) => {
	return (
		<div className={styles.app}>
			<form className={styles.formContainer} onSubmit={onSubmit}>
				<div className={styles.title}>Регистрация</div>
				{emailError && (
					<span className={styles.error}>{emailError}</span>
				)}
				<input
					type="email"
					name="email"
					value={email}
					placeholder="Почта"
					onChange={handleInput}
					onBlur={onBlur}
					className={emailError && styles.form__input_error}
				/>
				{passwordError && (
					<span className={styles.error}>{passwordError}</span>
				)}
				<input
					type="password"
					name="password"
					value={password}
					placeholder="Пароль"
					onChange={handleInput}
					onBlur={onBlur}
					className={passwordError && styles.form__input_error}
				/>
				{repeatPasswordError && (
					<span className={styles.error}>{repeatPasswordError}</span>
				)}
				<input
					type="password"
					name="repeatPassword"
					value={repeatPassword}
					placeholder="Повторите пароль"
					onChange={handleInput}
					onBlur={onBlur}
					className={repeatPasswordError && styles.form__input_error}
				/>
				<button
					ref={submitButtonRef}
					type="submit"
					disabled={
						initialDisabled ||
						emailError ||
						passwordError ||
						repeatPasswordError
					}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};

AppLayout.propTypes = {
	email: PropTypes.string,
	password: PropTypes.string,
	repeatPassword: PropTypes.string,
	emailError: PropTypes.string,
	passwordError: PropTypes.string,
	repeatPasswordError: PropTypes.string,
	handleInput: PropTypes.func,
	onBlur: PropTypes.func,
	onSubmit: PropTypes.func,
	submitButtonRef: PropTypes.object,
	initialDisabled: PropTypes.bool,
};

export const AppContainer = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");

	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [repeatPasswordError, setRepeatPasswordError] = useState(null);

	const submitButtonRef = useRef(null);

	const [initialDisabled, setInitialDisabled] = useState(true);

	const focusOnSubmitButton = (newError) => {
		if (!newError && email && password && repeatPassword) {
			setInitialDisabled(false);
			setTimeout(() => {
				submitButtonRef.current.focus();
			}, 0);
		}
	};

	const validationFields = ({ value, name }) => {
		let newError = null;

		switch (name) {
			case "email":
				newError = validationEmail(value);
				setEmailError(newError);
				focusOnSubmitButton(newError);
				break;
			case "password":
				newError = validationPassword(value, repeatPassword);
				setPasswordError(newError);
				focusOnSubmitButton(newError);
				if (!newError) {
					setRepeatPasswordError(newError);
				}
				break;
			case "repeatPassword":
				newError = validationRepeatPassword(value, password);
				setRepeatPasswordError(newError);
				focusOnSubmitButton(newError);
				break;
			default:
				break;
		}

		return;
	};

	const handleInput = ({ target }) => {
		switch (target.name) {
			case "email":
				setEmail(target.value);
				break;
			case "password":
				setPassword(target.value);
				break;
			case "repeatPassword":
				setRepeatPassword(target.value);
				if (!emailError && !passwordError && !repeatPasswordError) {
					validationFields(target);
				}
				break;
			default:
				break;
		}

		if (emailError || passwordError || repeatPasswordError) {
			validationFields(target);
		}
	};

	const onBlur = ({ target }) => {
		validationFields(target);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		console.log({ email, password, repeatPassword });
		setEmail("");
		setPassword("");
		setRepeatPassword("");
	};

	return (
		<AppLayout
			email={email}
			password={password}
			repeatPassword={repeatPassword}
			emailError={emailError}
			passwordError={passwordError}
			repeatPasswordError={repeatPasswordError}
			handleInput={handleInput}
			onBlur={onBlur}
			onSubmit={onSubmit}
			submitButtonRef={submitButtonRef}
			initialDisabled={initialDisabled}
		/>
	);
};
