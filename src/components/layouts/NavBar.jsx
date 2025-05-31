
import { useAuth } from "@/context/AuthContext";
import { Text, Flex, Button, Span, Image, HStack, Link as ChakraLink, Box } from "@chakra-ui/react"
import logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom'

const MenuItems = [
    {label : "Bievenida", path:"welcome"},
    {label : "Recursos Técnicos", path:"/recursos"},

];

const NavBar = () => {
    const { user, logoutUser } = useAuth()
    return (

        <Flex as="nav" align="center" justify="space-between" p={4} >
            <Flex align="center" gap={1}>
                <Image src={logo} width="100px" />
                <Text as="h1" fontSize="lg">Project<Span fontWeight="bold" color="red.400">DEV</Span></Text>
            </Flex>
            <HStack p={2} gap={5}>
                {MenuItems.map((item,index)=>(
                    <ChakraLink  _hover={{color : 'red.500'}} key={index} as={Link} to={item.path}>
                    {item.label}
                    </ChakraLink>
                    ))}


                <Box><Button variant="outline" onClick={logoutUser}>Salir</Button></Box>

            </HStack>

        </Flex>

    );

};

export default NavBar; 