import './SignUp.css'
import {
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Button,
    Flex
} from '@chakra-ui/react';
import { PiCodeBold } from 'react-icons/pi'
import { registerUser } from '../../api';
import { useState, useEffect } from 'react';
import { SignUpRequestBody, SingUpRequestResponse } from '../../interfaces';
import axios, { AxiosResponse } from 'axios';
import { useAuthStore } from '../../store';
import { toast } from 'react-toastify';

/*
    Ejemplo de uso de la funcionde Registro

    const userData: SignUpRequestBody = {
    first_name: 'gerardo',
    last_name: 'torres',
    email: 'gtorres@binwus.com',
    password: '123456',
    };
    Para usarlo...
    registerUser(userData);
*/

export const SignUp = () => {


    const { grantAuthentication } = useAuthStore()

    const [registerData, setRegisterData] = useState<SignUpRequestBody>({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const { first_name, last_name, email, password } = registerData;

    useEffect(() => {
        setDisableButton(!first_name || !last_name || !email || !password);
    }, [first_name, last_name, email, password]);

    // manage changer events
    const handleChange = (event) => {
        setRegisterData({
            ...registerData,
            [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value
        });
    }

    // manage user click register
    const handleOnClickButton = async () => {
        try {

            // validate form is completed
            if (!first_name || !last_name || !email || !password) return;

            // active loading
            setLoading(true);

            const response:AxiosResponse = await registerUser(registerData);

            if (response.status !== 201) {
                toast.error(response.data)
                return;
            }
            
            toast.success('Register successfully');

            // save user authentication
            grantAuthentication((response.data as SingUpRequestResponse).token);
        } catch (error) {
            console.error(error);
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
            <form action="" id='sign-up'>
                <header>
                    <section>
                        <PiCodeBold size={'1.5rem'} />
                        <h1>DEVS</h1>
                    </section>
                    <section>
                        <h2>Welcome!</h2>
                        <p>Fill out the form to sign up</p>
                    </section>
                </header>

                <main>
                    <FormControl onChange={handleChange}>
                        <FormLabel>First name</FormLabel>
                        <Input name='first_name' type="text" borderRadius={'1.5rem'} placeholder='Enter your first name' value={first_name} />
                    </FormControl>

                    <FormControl onChange={handleChange}>
                        <FormLabel>Last name</FormLabel>
                        <Input name='last_name' type="text" borderRadius={'1.5rem'} placeholder='Enter your last name' value={last_name} />
                    </FormControl>

                    <FormControl onChange={handleChange}>
                        <FormLabel>Email</FormLabel>
                        <Input name='email' type="email" borderRadius={'1.5rem'} placeholder='you@example.com' value={email} />
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>

                    <FormControl onChange={handleChange}>
                        <FormLabel>Password</FormLabel>
                        <Input name='password' type="password" borderRadius={'1.5rem'} placeholder='Must be 8 characters long' value={password} />
                    </FormControl>
                </main>

                <footer>
                    <Button 
                        disabled={disableButton || loading}
                        colorScheme='blue'
                        borderRadius={'1.5rem'}
                        lineHeight={'inherit'}
                        size={'lg'}
                        onClick={handleOnClickButton}
                    >
                        Sign up
                    </Button>
                </footer>
            </form>
        </Flex>
    )
}

