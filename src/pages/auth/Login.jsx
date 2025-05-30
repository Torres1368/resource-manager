import React, { useEffect, useRef } from 'react'
import { Box, Input, Button, Text, Link as ChakraLink } from '@chakra-ui/react'
import { useAuth } from '@/context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const { user, loginUser } = useAuth()
  const navigate = useNavigate()
  const loginForm = useRef(null)

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

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
          placeholder="Enter email..."
          mb="4"
          isRequired
        />

        <Text mb="1">Password:</Text>
        <Input
          name="password"
          type="password"
          placeholder="Enter password..."
          mb="4"
          autoComplete="current-password"
          isRequired
        />

        <Button colorScheme="teal" type="submit" width="100%">
          Login
        </Button>
      </form>

      <Text mt="4" textAlign="center">
        Don't have an account?{' '}
        <ChakraLink as={Link} to="/register" color="teal.500">
          Register
        </ChakraLink>
      </Text>
    </Box>
  )
}

export default Login
