import { Card, Heading, Stack } from "@chakra-ui/react"

const Welcome = () => {
    return (
        <Stack>
            <Card.Root size="lg" p={3} align="center" >
                <Card.Header>
                    <Heading size="md">Hola, </Heading>
                </Card.Header>
                <Card.Body color="fg.muted">
                    Bienvenido al sistema 
                </Card.Body>
            </Card.Root>
        </Stack>
    )
}

export default Welcome;