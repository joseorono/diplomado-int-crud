import {
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Button
} from '@chakra-ui/react';

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

