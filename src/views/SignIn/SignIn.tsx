import './SignIn.css'
import { FormControl, FormLabel, Input, Button, Flex, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { PiCodeBold, PiEnvelopeSimpleDuotone, PiLockDuotone } from 'react-icons/pi'
import { signInUser } from '../../api'
import { useAuthStore } from '../../store'
import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { SingUpRequestResponse } from '../../interfaces'
import { Link } from 'wouter'
import { validateEmail, validatePassword } from '../../utils'

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
		setDisableButton(!email || !password || !validateEmail(email) || !validatePassword(password))
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
			<form method='post' id='sign-in' onSubmit={handleOnSubmit}>
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
					<FormControl>
						<FormLabel>Email</FormLabel>
						<InputGroup>
							<InputLeftElement pointerEvents={'none'}>
								<PiEnvelopeSimpleDuotone color={'#dbe7ff99'} />
							</InputLeftElement>
							<Input
								name='email'
								type='email'
								borderRadius={'1.5rem'}
								placeholder='you@example.com'
								value={email}
								onChange={handleChange}
							/>
						</InputGroup>
					</FormControl>

					<FormControl>
						<FormLabel>Password</FormLabel>
						<InputGroup>
							<InputLeftElement>
								<PiLockDuotone color={'#dbe7ff99'} />
							</InputLeftElement>
							<Input
								name='password'
								type='password'
								borderRadius={'1.5rem'}
								placeholder='Must be 8 characters long'
								value={password}
								onChange={handleChange}
							/>
						</InputGroup>
					</FormControl>
				</main>

				<footer>
					<Button
						type='submit'
						isDisabled={disable}
						isLoading={loading}
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
