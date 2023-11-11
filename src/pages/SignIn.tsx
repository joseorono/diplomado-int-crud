import {
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Button
} from '@chakra-ui/react';

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
