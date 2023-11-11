import './SignIn.css'
import {
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Button,
    Flex,
    InputGroup,
    InputLeftElement
} from '@chakra-ui/react';
import { PiCodeBold, PiEnvelopeSimpleDuotone, PiLockDuotone } from 'react-icons/pi'
import axios, { AxiosResponse } from 'axios';
import { Link } from 'wouter';

interface signInRequestBody {
    email: string;
    password: string;
}

interface signInRequestOption {
    method: string;
    url: string;
    headers: any;
    data: signInRequestBody;
}


const signInUser = async (userData: signInRequestBody): Promise<void> => {
    const api_url = import.meta.env.VITE_API_AUTH_URL

    const options: signInRequestOption = {
        method: 'POST',
        url: api_url + '/login/',
        headers: { 'Content-Type': 'application/json' },
        data: userData
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error('(Axios) Login failed:', error.message);
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        }
    });
}

export const SignIn = () => {
    return (
        <Flex w={'100%'} h={'100%'} justifyContent={'center'} alignItems={'center'}>
            <form action="" id='sign-in'>
                <header>
                    <section>
                        <PiCodeBold size={'1.5rem'} />
                        <h1>DEVS</h1>
                    </section>
                    <section>
                        <h2>Welcome!</h2>
                        <p>Don't have an account? <Link href='/sign-up'>Sign up</Link></p>
                    </section>
                </header>

                <main>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <PiEnvelopeSimpleDuotone color={'#dbe7ff99'} />
                            </InputLeftElement>
                            <Input type="email" borderRadius={'1.5rem'} placeholder='you@example.com' />
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <PiLockDuotone color={'#dbe7ff99'} />
                            </InputLeftElement>
                            <Input type="password" borderRadius={'1.5rem'} placeholder='Must be 8 characters long' />
                        </InputGroup>
                    </FormControl>
                </main>

                <footer>
                    <Button type='submit' colorScheme='blue' borderRadius={'1.5rem'} lineHeight={'inherit'} size={'lg'}>Sign in</Button>
                </footer>
            </form>
        </Flex>
    );
};
