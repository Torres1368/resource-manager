import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    Textarea, Box, Select, FileUpload, Flex,
    createListCollection,
    Portal, Input, Button, Text, Link as ChakraLink
} from '@chakra-ui/react';
import { HiUpload } from "react-icons/hi";

import db from '@/lib/databases';
import { getFileUrl, uploadFile } from '@/lib/storage';
import { File } from 'lucide-react';

const UpdateResource = () => {
    const { id } = useParams(); // Obtiene el ID del recurso a editar desde la URL
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState(null);
    const [currentFileId, setCurrentFileId] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Cargar los datos del recurso existente
    useEffect(() => {
        const fetchResource = async () => {
            try {
                const resource = await db.resources.get(id);
                setTitle(resource.title);
                setDescription(resource.description);
                setCategory(resource.category);
                setCurrentFileId(resource.fileId);
                setLoading(false);
            } catch (error) {
                console.error("Error", error);
                setLoading(false);
            }
        };

        fetchResource();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!title || !description || !category) {
            alert("No puede actualizar con campos vacios")
            return;
        }

        try {
            let newFileId = currentFileId;

            // Si se seleccionó un nuevo archivo, subirlo
            if (file) {
                newFileId = await uploadFile(file);
            }

            const payload = {
                title,
                description,
                category,
                fileId: newFileId
            };

            await db.resources.update(id, payload);
            alert("Recurso actualizado exitosamente");
            navigate('/resource');
        } catch (error) {
            console.error("Error al actualizar:", error);
            setError("Error al actualizar el recurso");
        }
    };


    return (
        <Box maxW="400px" mx="auto" mt="10px" p={4} gap={3} borderWidth="1px" borderRadius="md">
            <form onSubmit={handleSubmit} >
                <Text as="h1" mb={3} fontSize="xl" color="red.500" fontWeight="revert" textAlign="center">
                    Editar Recurso
                </Text>

                <Text mb={3} as="label">Título:</Text>
                <Input
                    type="text"
                    placeholder="Ingresa el título.."
                    mb="2"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />

                <Text mb={1} as="label">Descripción:</Text>
                <Textarea
                    placeholder="Ingresa la descripción del recurso.."
                    mb="1"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />

                <Text as="label">Selecciona el tipo:</Text>
                <Select.Root
                    collection={categories}
                    selectedKey={category}
                    onChange={(event) => setCategory(event.target.value)}
                    size="md"
                    width="100%"
                    mb="3"
                >
                    <Select.HiddenSelect />
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder={category} />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {categories.items.map((item) => (
                                    <Select.Item key={item.value} item={item} >
                                        {item.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>

                <Text as="label">Archivo actual:</Text>
                {currentFileId ? (
                    <ChakraLink
                        href={getFileUrl(currentFileId)}
                        isExternal
                        color="red.500"
                        target="_blank"
                        rel="noopener noreferrer"
                        display="block"
                        mb={2}
                    >
                        <File/>
                    </ChakraLink>
                ) : (
                    <Text color="gray.500" mb={2}>No hay archivo disponible</Text>
                )}

                <Text as="label">Cambiar archivo (opcional):</Text>
                <FileUpload.Root mb={4} >
                    <FileUpload.HiddenInput 
                     accept=".jpg,.jpeg,.png,.gif,.html,.pdf,.mp4"
                     onChange={(event) => setFile(event.target.files[0])} />
                    <FileUpload.Trigger asChild>
                        <Button variant="outline" size="sm">
                            <HiUpload /> Upload file
                        </Button>
                    </FileUpload.Trigger>
                    <FileUpload.List />
                </FileUpload.Root>

                <Flex p={3} justify={'space-between'} >
                    <Button as={Link} to="/resource">
                        Cancelar
                    </Button>
                    <Button type='submit' bg="red.500">
                        Actualizar
                    </Button>
                </Flex>
            </form>
        </Box>
    );
};

const categories = createListCollection({
    items: [
        { label: "Documentación", value: "documentacion" },
        { label: "Credenciales", value: "credenciales" },
        { label: "Soporte", value: "soporte" },
    ],
});

export default UpdateResource;