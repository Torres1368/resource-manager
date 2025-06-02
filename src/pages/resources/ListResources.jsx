import { useEffect, useState } from "react";
import { Stack, Heading, Table, Link as ChakraLink, Text, Flex, Button, Box } from "@chakra-ui/react";
import { Input, InputGroup, Kbd } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import db from "@/lib/databases";
import { getFileUrl } from "@/lib/storage";
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AiOutlinePlusCircle } from "react-icons/ai";

import { IconButton } from "@chakra-ui/react"
import { File, PenIcon, Plus, PlusSquareIcon, TrashIcon } from "lucide-react";

const ListResources = () => {
    const [resources, setResources] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        const response = await db.resources.list();
        setResources(response.documents);
    };

    const deleteResource = async (id) => {
        const confirm = window.confirm("Deseas eliminar este registro?")
        if (!confirm) return;
        await db.resources.delete(id);
        setResources((prev) => prev.filter((r) => r.$id !== id));
    }

    const filterResources = resources.filter((resource) => {
        const text = search.toLowerCase();
        return (
            resource.title.toLowerCase().includes(text) ||
            resource.description.toLowerCase().includes(text) ||
            resource.category.toLowerCase().includes(text) ||
            new Date(resource.$createdAt).toLocaleDateString().toLowerCase().includes(text)
        );
    })

    return (
        <Stack width="full" gap="5" px={["4", null, "0"]} maxW="1000px" mx="auto" mt={6}>

            <Flex justify="space-between" align="center">
                <Heading size="xl">Lista de recursos</Heading>

                <Button {...redStyle}  as={Link} to="/newResource" ><PlusSquareIcon />  Agregar Nuevo Recurso</Button>

            </Flex>
            <Input placeholder="Buscar.." width="50%" value={search} onChange={(event) => setSearch(event.target.value)} />

            <Box overflowX="auto">
                <Table.Root size="sm" variant="outline" striped >
                    <Table.Header bg="red.500">
                        <Table.Row  >
                            <Table.ColumnHeader fontWeight="bolder">Título</Table.ColumnHeader>
                            <Table.ColumnHeader fontWeight="bolder" >Descripción</Table.ColumnHeader>
                            <Table.ColumnHeader fontWeight="bolder">Categoría</Table.ColumnHeader>
                            <Table.ColumnHeader fontWeight="bolder">Creado</Table.ColumnHeader>
                            <Table.ColumnHeader fontWeight="bolder" >Archivo</Table.ColumnHeader>
                            <Table.ColumnHeader fontWeight="bolder" textAlign="center">Acciones</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {filterResources.map((resource) => {
                            const fileUrl = resource.fileId ? getFileUrl(resource.fileId) : null;
                            return (
                                <Table.Row key={resource.$id}>
                                    <Table.Cell>{resource.title}</Table.Cell>
                                    <Table.Cell {...cellStyle} >{resource.description}</Table.Cell>
                                    <Table.Cell>{resource.category}</Table.Cell>
                                    <Table.Cell>{new Date(resource.$createdAt).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>
                                        {fileUrl ? (
                                            <ChakraLink href={fileUrl} isExternal color="red.500" bg target="_blank" rel="noopener noreferrer">
                                                <File />
                                            </ChakraLink>
                                        ) : (
                                            <Text color="gray.500">No disponible</Text>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell >
                                        <Flex gap={2}>
                                        <Button {...updateStyle} as={Link} to={`/resource/update/${resource.$id}`}>

                                            <PenIcon />

                                        </Button>
                                        <Button {...redStyle}
                                            onClick={() => deleteResource(resource.$id)}>

                                            <TrashIcon />

                                        </Button>
                                        </Flex>
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table.Root>
            </Box>
        </Stack>
    );

};

export default ListResources;

const cellStyle = {
    maxW: "200px",
    // whiteSpace: "nowrap",  si no quiero mutar las celdas
    overflow: "hidden",
    textOverflow: "ellipsis",
};

const redStyle = {
    variant: "outline", borderColor: "red.500", color: "red.500",
    _hover: {
        bg: "red.500",
        color: "white",
    },
};

const updateStyle = {
    variant: "outline", borderColor: "yellow.600", color: "yellow.500",
    _hover: {
        bg: "yellow.600",
        color: "white",
    },
};