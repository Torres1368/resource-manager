import { useAuth } from "@/context/AuthContext";
import { Card, Heading, Stack } from "@chakra-ui/react"

const Welcome = () => {
    const { user} = useAuth()
    return (
        <Stack>
            <Card.Root size="lg" p={3} align="center" >
                <Card.Header>
                    <Heading size="md">Hola, {user.name} </Heading>
                </Card.Header>
                <Card.Body color="fg.muted">
                    Bienvenido al sistema 
                </Card.Body>
            </Card.Root>
        </Stack>
    )
}

export default Welcome;