import React, { useEffect, useRef } from 'react'
import { Box, Input, Button, Text, Link as ChakraLink, Image, Flex } from '@chakra-ui/react'
import { useAuth } from '@/context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { PasswordInput } from '@/components/ui/password-input'
import logo from '../../assets/img/logo2.png';

const Login = () => {
  const navigate = useNavigate()
  const { user, loginUser } = useAuth()
  const loginForm = useRef(null)

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = loginForm.current.email.value
    const password = loginForm.current.password.value

    if (!email || !password) {
      alert('Llena todos los campos');
      return;
    }

    const userInfo = { email, password }
    loginUser(userInfo)
  }



  return (
    <Box minH="100vh" bgSize="cover" bgPosition="center" display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box maxW="400px" mx="auto" mt="50px" p="6" gap={3} borderWidth="1px" borderRadius="md">
        <form onSubmit={handleSubmit} ref={loginForm}>
          <Flex direction="column" align="center" justify="center">
            <Image src={logo} width="40%" />
            <Text as="h1" fontSize="lg" fontWeight="bolder" color="red.500"> Iniciar Sesión</Text>
          </Flex>
          <Text mb="1">Email:</Text>
          <Input
            name="email"
            type="email"
            placeholder="Ingresa el email"
            mb="4"
          />

          <Text mb="1">Contraseña:</Text>
          <PasswordInput
            name="password"
            placeholder="Ingresa la contraseña"
            mb="4"
          />

          <Button bg="red.500" type="submit" width="100%">
            Ingresar
          </Button>
        </form>

        <Text mt="4" textAlign="center">
          No tienes una cuenta?{' '}
          <ChakraLink as={Link} to="/register" color="red.500">
            Registrate
          </ChakraLink>
        </Text>
      </Box>
    </Box>
  )
}

export default Login
