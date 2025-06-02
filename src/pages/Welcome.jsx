import { useAuth } from "@/context/AuthContext";
import { Card, Flex, Heading, Span, Stack, Text } from "@chakra-ui/react"

const Welcome = () => {
    const { user } = useAuth();

    return (
        <Stack px={{ base: 4, md: 10, lg: 20 }} pt={{ base: 10, md: 16 }} height={{ base: "auto", md: "80vh" }}
            justify="center">
            <Card.Root size="lg" align="center" variant="elevated">
                <Card.Header>
                    <Text
                        fontFamily="monospace"
                        fontSize={{ base: "4xl", md: "6xl", lg: "9xl" }} 
                        textAlign="center"
                    >
                        Hola, <Span color="red.500">{user.name}</Span>
                    </Text>
                </Card.Header>

                <Card.Body>
                    <Flex justify={{ base: "center", md: "flex-end" }} mt={4}>
                        <Text
                            as="h2"
                            fontFamily="monospace"
                            fontSize={{ base: "md", md: "2xl", lg: "4xl" }}
                            textAlign={{ base: "center", md: "right" }}
                        >
                            Empieza a gestionar los recursos :P
                        </Text>
                    </Flex>
                </Card.Body>
            </Card.Root>
        </Stack>
    );
};

export default Welcome;