import React, { useEffect, useRef } from 'react'
import { Box, Input, Button, Text, Link as ChakraLink } from '@chakra-ui/react'
import { useAuth } from '@/context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

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
    const userInfo = { email, password }
    loginUser(userInfo)
  }

  return (
    <Box maxW="400px" mx="auto" mt="50px" p="6" borderWidth="1px" borderRadius="md">
      <form onSubmit={handleSubmit} ref={loginForm}>
        <Text mb="1">Email:</Text>
        <Input
          name="email"
          type="email"
          placeholder="Ingresa el email"
          mb="4"
        />

        <Text mb="1">Contraseña:</Text>
        <Input
          name="password"
          type="password"
          placeholder="Ingresa la contraseña"
          mb="4"
        />

        <Button  type="submit" width="100%">
          Ingresar
        </Button>
      </form>

      <Text mt="4" textAlign="center">
        No tienes una cuenta?{' '}
        <ChakraLink as={Link} to="/register" color="teal.500">
          Registrate
        </ChakraLink>
      </Text>
    </Box>
  )
}

export default Login
