import {
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Button
} from '@chakra-ui/react';

import axios, { AxiosResponse } from 'axios';

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
    
    const options:signInRequestOption = {
        method: 'POST',
        url: api_url + '/login/',
        headers: {'Content-Type': 'application/json'},
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
        <form action="">
            <header></header>

            <main>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>

                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" />
                </FormControl>
            </main>

            <footer>
                <Button colorScheme='blue'>Button</Button>
            </footer>
        </form>
    );
};
