
import { useUser } from "@/context/AuthContext";
import { Text } from "@chakra-ui/react"

const NavBar = () => {
    const user = useUser();
    if (!user?.current) return null;

    return <Text bg="red.400">This is the navbar</Text>;

};

export default NavBar; 