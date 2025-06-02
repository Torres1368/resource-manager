
import { useAuth } from "@/context/AuthContext";
import { Text, Flex, Button, Span, Image, HStack, Link as ChakraLink, Box, Menu } from "@chakra-ui/react"
import logo from '../../assets/img/logo2.png';
import { Link } from 'react-router-dom'
import { ColorModeButton, DarkMode, LightMode, useColorMode, useColorModeValue, } from "@/components/ui/color-mode"
import { LogOutIcon } from "lucide-react";


const MenuItems = [
    { label: "Bievenida", path: "welcome" },
    { label: "Recursos Técnicos", path: "resource" },

];

const NavBar = () => {
    const { user, logoutUser } = useAuth()
    return (
        <Flex as="nav" align="center" justify="space-between"  >
            <Flex align="center" gap={1}>
                <Image src={logo} width="100px" />
                <Text as="h1" fontSize="lg" fontWeight="bolder"><Span fontSize="2xl" fontWeight="bolder" color="red.600">WIST</Span>PROJECT</Text>
            </Flex>
            <HStack p={2} gap={5} display={['none', 'flex']}>
                <ColorModeButton />

                {MenuItems.map((item, index) => (
                    <ChakraLink _hover={{ color: 'red.500' }} key={index} as={Link} to={item.path}>
                        {item.label}
                    </ChakraLink>
                ))}

                <Box><Button bg="red.500" onClick={logoutUser}> <LogOutIcon/> Salir</Button></Box>
            </HStack>

            <Flex display={['flex', 'none']} align="center" p={1} gap={4}>
                <ColorModeButton />
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