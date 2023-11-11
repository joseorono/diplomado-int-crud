import {
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Button
} from '@chakra-ui/react';

import axios, { AxiosError, AxiosResponse } from 'axios';

interface SignUpRequestBody {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const api_url = import.meta.env.VITE_API_AUTH_URL

const registerUser = async (userData: SignUpRequestBody): Promise<void> => {
    try {
      const response: AxiosResponse = await axios.post(api_url+'/register/', userData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
  
      // Handle successful registration
      console.log('Registration successful!', response.data);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        // Axios error (e.g., network error, response status not in 2xx)
        console.error('(Axios) Registration failed:', error.message);
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        }
      } else {
        // Non-Axios error
        console.error('An unexpected error occurred:', error);
      }
    }
  };


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
    return (
        <form action="">
            <header></header>

            <main>
                <FormControl>
                    <FormLabel>First name</FormLabel>
                    <Input type="text" />
                </FormControl>

                <FormControl>
                    <FormLabel>Last name</FormLabel>
                    <Input type="text" />
                </FormControl>

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
    )
}

