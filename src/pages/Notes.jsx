import { Box, Heading, VStack, Input, Button, Text, HStack } from "@chakra-ui/react";
import { useState } from "react";

const Notes = () => {
  const [notes, setNotes] = useState([
    { id: 1, text: "Buy groceries" },
    { id: 2, text: "Call mom" },
  ]);
  const [input, setInput] = useState("");

  const handleAddNote = () => {
    if (input.trim() === "") return;

    const newNote = {
      id: notes.length + 1,
      text: input,
    };

    setNotes([...notes, newNote]);
    setInput("");
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Notes Page</Heading>
      <VStack spacing={4} align="start">
        <Box bg="gray.100" p={4} rounded="md" width="100%" maxHeight="400px" overflowY="auto">
          {notes.map((note) => (
            <Box key={note.id} bg="white" p={2} rounded="md" shadow="md" mb={2}>
              <Text>{note.text}</Text>
            </Box>
          ))}
        </Box>
        <HStack width="100%">
          <Input
            placeholder="Add a new note..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={handleAddNote}>Add Note</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Notes;