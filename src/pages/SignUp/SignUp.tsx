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

export const SignUp = () => {
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
                    <FormControl>
                        <FormLabel>First name</FormLabel>
                        <Input type="text" borderRadius={'1.5rem'} placeholder='Enter your first name' />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Last name</FormLabel>
                        <Input type="text" borderRadius={'1.5rem'} placeholder='Enter your last name' />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" borderRadius={'1.5rem'} placeholder='you@example.com' />
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" borderRadius={'1.5rem'} placeholder='Must be 8 characters long' />
                    </FormControl>
                </main>

                <footer>
                    <Button colorScheme='blue' borderRadius={'1.5rem'} lineHeight={'inherit'} size={'lg'}>Sign up</Button>
                </footer>
            </form>
        </Flex>
    )
}

