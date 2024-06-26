import { Box, Heading, VStack, Input, Button, Text, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { users } from '../data/store';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", user: users[0] },
    { id: 2, text: "Hi, how are you?", user: users[1] },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      text: input,
      user: users[0], // Assuming the first user is the sender
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Chat Page</Heading>
      <VStack spacing={4} align="start">
        <Box bg="gray.100" p={4} rounded="md" width="100%" maxHeight="400px" overflowY="auto">
          {messages.map((message) => (
            <Box key={message.id} bg="white" p={2} rounded="md" shadow="md" mb={2}>
              <Text fontWeight="bold">{message.user.username}</Text>
              <Text>{message.text}</Text>
            </Box>
          ))}
        </Box>
        <HStack width="100%">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={handleSend}>Send</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Chat;