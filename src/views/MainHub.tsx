
import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'



function MainHub() {
  const hubLinks = [
    { id: 1, title: 'Sign Up', url: '/sign-up' },
    { id: 2, title: 'Sign In', url: '/sign-in' },
  ];
  
  return (

    <Center py={6} margin={"auto"}>
      <Box
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Stack
          textAlign={'center'}
          p={6}
          color={useColorModeValue('gray.800', 'white')}
          align={'center'}>

            <Text fontSize={'6xl'} fontWeight={800}>
              HUB
            </Text>

        </Stack>

        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>

          {hubLinks.map((link) => 

            <Button
            mt={5}
            w={'full'}
            bg={'green.500'}
            color={'white'}
            rounded={'xl'}
            _hover={{
              bg: 'green.600',
            }}
            _focus={{
              bg: 'green.600',
            }}
            as={Link}
            href={link.url}
            >
              {link.title}
            </Button>

          )
          }
            
        </Box>
      </Box>
  </Center>
  );
};



export default MainHub