import {
    Textarea, Box, Select, FileUpload, Flex,
    createListCollection,
    Portal, Input, Button, Text, Link as ChakraLink
} from '@chakra-ui/react'
import { HiUpload } from "react-icons/hi"
import { Link, useNavigate } from 'react-router-dom'

import db from '@/lib/databases';
import { useState } from 'react';
import { uploadFile } from '@/lib/storage';

const NewResource = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("")
    const [file, setFile] = useState(null)


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!title || !description || !category || !file) {
            alert("Debes completar todos los campos");
            return;
        }
        try {
            const fileId = await uploadFile(file)
            const payload = { title, description, category, fileId, };

            await db.resources.create(payload);
            alert("Recurso creado exitosamente");
            setTitle("");
            setDescription("");
            setCategory("");
            setFile(null);
            navigate('/resource');
        } catch (error) {
            console.error("Error cuando creo", error);
            alert("Error al crear");
        }
    };

    return (
        <Box maxW="400px" mx="auto" mt="10px" p={4} gap={3} borderWidth="1px" borderRadius="md">
            <form onSubmit={handleSubmit} >
                <Text as="h1" mb={3} color="red.500" fontWeight="revert" textAlign="center">Agregar Nuevo Recurso</Text>
                <Text mb={3} as="label">Titulo:</Text>
                <Input
                    name="email"
                    type="text"
                    placeholder="Ingresa el titulo.."
                    mb="2"
                    onChange={(event) => setTitle(event.target.value)}
                />

                <Text mb={1} as="label">Descripción:</Text>
                <Textarea
                    name="password"
                    placeholder="Ingresa la descripcion del recurso.."
                    mb="1"
                    onChange={(event) => setDescription(event.target.value)}
                />

                <Text as="label">Selecciona el tipo:</Text>

                <Select.Root collection={categories} size="md" width="100%" mb="3"
                    onChange={(event) => setCategory(event.target.value)}>
                    <Select.HiddenSelect />
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Selecciona el tipo" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {categories.items.map((item) => (
                                    <Select.Item item={item} key={item.value}>
                                        {item.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>

                <Text as="label">Selecciona el archivo</Text>
                <FileUpload.Root mb={4} >
                    <FileUpload.HiddenInput  accept=".jpg,.jpeg,.png,.gif,.html,.pdf,.mp4"
                     onChange={(event) => setFile(event.target.files[0])} />
                    <FileUpload.Trigger asChild>
                        <Button variant="outline" size="sm">
                            <HiUpload /> Upload file
                        </Button>
                    </FileUpload.Trigger>
                    <FileUpload.List />
                </FileUpload.Root>

                <Flex p={3} justify={'space-between'} >
                    <Button   as={Link} to="/resource">
                        Cancelar
                    </Button>
                    <Button type='submit' bg="red.500">
                        Agregar
                    </Button>
                </Flex>
            </form>


        </Box>
    )
}

const categories = createListCollection({
    items: [
        { label: "Documentación", value: "documentacion" },
        { label: "Credenciales", value: "credenciales" },
        { label: "Soporte", value: "soporte" },
    ],
});


export default NewResource;