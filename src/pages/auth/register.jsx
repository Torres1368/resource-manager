import React, { useEffect, useRef } from 'react'
import { Box, Input, Button, Text, Link as ChakraLink } from '@chakra-ui/react'
import { useAuth } from '@/context/AuthContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'

const Register = () => {
    const registerForm = useRef(null);
    const { user, registerUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        const name = registerForm.current.name.value
        const email = registerForm.current.email.value
        const password1 = registerForm.current.password1.value
        const password2 = registerForm.current.password2.value

        if (password1 !== password2) {
            alert('Las contraseñas no coinciden')
            return
        }

        const userInfo = { name, email, password1, password2 }
        registerUser(userInfo)
    }
    return (
        <Box maxW="400px" mx="auto" mt="50px" p="6" borderWidth="1px" borderRadius="md">
            <form onSubmit={handleSubmit} ref={registerForm}>
                <Text mb="1">Nombre:</Text>
                <Input
                    name="name"
                    type="text"
                    placeholder="Ingresa el nombre"
                    mb="4"
                />

                <Text mb="1">Email:</Text>
                <Input
                    name="email"
                    type="text"
                    placeholder="Ingresa el correo"
                    mb="4"
                />

                <Text mb="1">Contraseña:</Text>
                <Input
                    name="password1"
                    type="password"
                    placeholder="Ingrese la contraseña"
                    mb="4"
                />

                <Text mb="1">Password:</Text>
                <Input
                    name="password2"
                    type="password"
                    placeholder="Enter password..."
                    mb="4"
                />

                <Button  type="submit" width="100%">
                    Registrar
                </Button>
            </form>

            <Text mt="4" textAlign="center">
                Ya tienes una cuenta? {' '}
                <ChakraLink as={Link} to="/login" color="teal.500">
                     Inicia Sesión {':)'}
                </ChakraLink>
            </Text>
        </Box>
    )


}

export default Register;