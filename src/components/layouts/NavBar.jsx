
import { useAuth } from "@/context/AuthContext";
import { Text, Flex, Button, Span, Image, HStack, Link as ChakraLink, Box, Menu } from "@chakra-ui/react"
import logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom'
import { ColorModeButton, DarkMode, LightMode, useColorMode, useColorModeValue, } from "@/components/ui/color-mode"

const MenuItems = [
    { label: "Bievenida", path: "welcome" },
    { label: "Recursos Técnicos", path: "/recursos" },

];

const NavBar = () => {
    const { user, logoutUser } = useAuth()
    return (
        <Flex as="nav" align="center" justify="space-between" p={4} >
            <Flex align="center" gap={1}>
                <Image src={logo} width="100px" />
                <Text as="h1" fontSize="lg">Project<Span fontWeight="bold" color="red.400">DEV</Span></Text>
            </Flex>
            <HStack p={2} gap={5} display={['none', 'flex']}>
                <ColorModeButton />
                {MenuItems.map((item, index) => (
                    <ChakraLink _hover={{ color: 'red.500' }} key={index} as={Link} to={item.path}>
                        {item.label}
                    </ChakraLink>
                ))}
                <Box><Button variant="outline" onClick={logoutUser}>Salir</Button></Box>
            </HStack>

            <Flex display={['flex', 'none']} align="center" p={1} gap={2}>

                <Menu.Root>
                    <Menu.Trigger>
                        <Button variant="outline" >☰</Button >
                    </Menu.Trigger>
                    <Menu.Positioner>
                        <Menu.Content>
                            {Object.values(MenuItems).map((item, index) => (
                                <Menu.Item key={index} as={Link} to={item.path} >{item.label}</Menu.Item>
                            ))}
                            <Menu.Item>
                                <Link variant="outline" onClick={logoutUser}>Salir</Link>
                            </Menu.Item>
                        </Menu.Content>
                    </Menu.Positioner>
                </Menu.Root>

            </Flex>
        </Flex>

    );

};

export default NavBar; 