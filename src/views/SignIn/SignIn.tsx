import './SignIn.css'
import { FormControl, FormLabel, Input, FormHelperText, Button, Flex } from '@chakra-ui/react'
import { PiCodeBold } from 'react-icons/pi'
import { signInUser } from '../../api'
import { useAuthStore } from '../../store'
import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { SingUpRequestResponse } from '../../interfaces'
import { Link } from 'wouter'

export const SignIn = () => {
	const { grantAuthentication } = useAuthStore()
	const [authForm, setAuthForm] = useState({
		email: '',
		password: ''
	})
	const [disable, setDisableButton] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)

	const { email, password } = authForm

	useEffect(() => {
		setDisableButton(!email || !password)
	}, [email, password])

	// manage changer events
	const handleChange = event => {
		setAuthForm({
			...authForm,
			[(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value
		})
	}

	// manage user click register
	const handleOnSubmit = async e => {
		e.preventDefault()

		try {
			// validate form is completed
			if (!email || !password) return

			// active loading
			setLoading(true)

			const response: AxiosResponse = await signInUser(authForm)

			if (response.status !== 200) {
				toast.error(response.data)
				return
			}

			toast.success('Login successfully')

			// save user authentication
			grantAuthentication((response.data as SingUpRequestResponse).token)
		} catch (error) {
			console.error(error)
			if (axios.isAxiosError(error)) {
				toast.error(JSON.stringify(error?.response?.data))
			} else {
				toast.error('Error')
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<Flex w={'100%'} h={'100%'} justifyContent={'center'} alignItems={'center'}>
			<form method='post' id='sign-in'>
				<header>
					<section>
						<PiCodeBold size={'1.5rem'} />
						<h1>DEVS</h1>
					</section>
					<section>
						<h2>Welcome!</h2>
						<p>
							Don't have an account? <Link href='/sign-up'>Sign up</Link>
						</p>
					</section>
				</header>

				<main>
					<FormControl onChange={handleChange}>
						<FormLabel>Email</FormLabel>
						<Input name='email' type='email' borderRadius={'1.5rem'} placeholder='you@example.com' value={email} />
					</FormControl>

					<FormControl onChange={handleChange}>
						<FormLabel>Password</FormLabel>
						<Input name='password' type='password' borderRadius={'1.5rem'} placeholder='Must be 8 characters long' value={password} />
					</FormControl>
				</main>

				<footer>
					<Button
						type='submit'
						disabled={disable || loading}
						onClick={handleOnSubmit}
						colorScheme='blue'
						borderRadius={'1.5rem'}
						lineHeight={'inherit'}
						size={'lg'}>
						Sign in
					</Button>
				</footer>
			</form>
		</Flex>
	)
}
