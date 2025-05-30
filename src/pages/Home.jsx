import { useAuth } from "@/context/AuthContext";
import { Button, Flex, Text } from "@chakra-ui/react";


export function Home() {
  const { user, logoutUser } = useAuth()

  const logoutClick = () => {
    navigate('/login')
  }
  return (
    <Flex align="center" bg="red.500" justify="center" h="100vh">
      <Button bg="red.500" onClick={logoutUser}>
        Salir
      </Button>
    </Flex>
  );
}

export default Home;
