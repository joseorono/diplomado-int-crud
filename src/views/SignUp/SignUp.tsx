import './SignUp.css'
import { FormControl, FormLabel, Input, FormHelperText, Button, Flex, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { PiCodeBold, PiEnvelopeSimpleDuotone, PiLockDuotone, PiUserDuotone, PiPencilDuotone } from 'react-icons/pi'
import { Link } from 'wouter'
import { registerUser } from '../../api'
import { useState, useEffect } from 'react'
import { SignUpRequestBody, SingUpRequestResponse } from '../../interfaces'
import axios, { AxiosResponse } from 'axios'
import { useAuthStore } from '../../store'
import { toast } from 'react-toastify'

export const SignUp = () => {
	const { grantAuthentication } = useAuthStore()

	const [registerData, setRegisterData] = useState<SignUpRequestBody>({
		first_name: '',
		last_name: '',
		email: '',
		password: ''
	})
	const [disableButton, setDisableButton] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(true)

	const { first_name, last_name, email, password } = registerData

	useEffect(() => {
		setDisableButton(!first_name || !last_name || !email || !password)
	}, [first_name, last_name, email, password])

	// manage changer events
	const handleChange = event => {
		setRegisterData({
			...registerData,
			[(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value
		})
	}

	// manage user click register
	const handleOnSubmit = async e => {
		e.preventDefault()

		try {
			// validate form is completed
			if (!first_name || !last_name || !email || !password) return

			// active loading
			setLoading(true)

			const response: AxiosResponse = await registerUser(registerData)

			if (response.status !== 201) {
				toast.error(response.data)
				return
			}

			toast.success('Register successfully')

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
			<form method='post' id='sign-up' onSubmit={handleOnSubmit}>
				<header>
					<section>
						<PiCodeBold size={'1.5rem'} />
						<h1>DEVS</h1>
					</section>
					<section>
						<h2>Welcome!</h2>
						<p>
							Already have an account? <Link href='/sign-in'>Sign in</Link>
						</p>
					</section>
				</header>

				<main>
					<FormControl onChange={handleChange}>
						<FormLabel>First name</FormLabel>
						<InputGroup>
							<InputLeftElement pointerEvents='none'>
								<PiUserDuotone color={'#dbe7ff99'} />
							</InputLeftElement>
							<Input name='first_name' type='text' borderRadius={'1.5rem'} placeholder='Enter your first name' value={first_name} />
						</InputGroup>
					</FormControl>

					<FormControl onChange={handleChange}>
						<FormLabel>Last name</FormLabel>
						<InputGroup>
							<InputLeftElement pointerEvents='none'>
								<PiPencilDuotone color={'#dbe7ff99'} />
							</InputLeftElement>
							<Input name='last_name' type='text' borderRadius={'1.5rem'} placeholder='Enter your last name' value={last_name} />
						</InputGroup>
					</FormControl>

					<FormControl onChange={handleChange}>
						<FormLabel>Email</FormLabel>
						<InputGroup>
							<InputLeftElement pointerEvents='none'>
								<PiEnvelopeSimpleDuotone color={'#dbe7ff99'} />
							</InputLeftElement>
							<Input name='email' type='email' borderRadius={'1.5rem'} placeholder='you@example.com' value={email} />
						</InputGroup>
						<FormHelperText>We'll never share your email.</FormHelperText>
					</FormControl>

					<FormControl onChange={handleChange}>
						<FormLabel>Password</FormLabel>
						<InputGroup>
							<InputLeftElement pointerEvents='none'>
								<PiLockDuotone color={'#dbe7ff99'} />
							</InputLeftElement>
							<Input name='password' type='password' borderRadius={'1.5rem'} placeholder='Must be 8 characters long' value={password} />
						</InputGroup>
					</FormControl>
				</main>

				<footer>
					<Button
						type='submit'
						disabled={disableButton || loading}
						colorScheme='blue'
						borderRadius={'1.5rem'}
						lineHeight={'inherit'}
						size={'lg'}>
						Sign up
					</Button>
				</footer>
			</form>
		</Flex>
	)
}
