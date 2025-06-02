import { Box, Flex, Text, Link } from "@chakra-ui/react";


const Footer = () => {
    return (
        <Box as="footer" py={6} px={4} mt={10}>
            <Flex direction={{ base: "column", md: "row" }} align="center"
                justify="space-between" maxW="1200px" mx="auto" w="full">
                <Text fontWeight="bold" mb={{ base: 4, md: 0 }}>
                    TORRES<Text as="span" color="red.500">1368</Text>
                </Text>
            </Flex>


            <Box borderTop="1px solid" borderColor="gray.300" my={4} />

            <Text fontSize="sm" textAlign="center" color="gray.600">
                2025 PJWIST, MiniProject
            </Text>
        </Box>
    );
};

export default Footer;
