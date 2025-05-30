import { useAuth } from "@/context/AuthContext";
import { Button, Flex, Text } from "@chakra-ui/react";


export function Home() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Text>No estas logeado mi bro</Text>
    );
  }

  return (
    <Flex align="center" bg="red.500" justify="center" h="100vh">
      <Button bg="red.500">
        Salir
      </Button>
    </Flex>
  );
}

export default Home;
