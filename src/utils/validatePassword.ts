export const validatePassword = (password: string) => {
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:;<>,.?~\\[\]-]).{8,}$/
	return regex.test(password)
}
