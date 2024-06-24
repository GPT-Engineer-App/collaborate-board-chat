import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Select } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { users } from '../data/store';

const TicketCreationModal = ({ isOpen, onClose, onCreate }) => {
  const [content, setContent] = useState('');
  const [assignee, setAssignee] = useState(users[0].id);

  const handleCreate = () => {
    const newTask = {
      id: uuidv4(),
      content,
      creator: users[0], // Assuming the first user is the creator
      assignee: users.find(user => user.id === assignee),
    };
    onCreate(newTask);
    setContent('');
    setAssignee(users[0].id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Ticket</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Task content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            mb={4}
          />
          <Select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          >
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCreate}>
            Create
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TicketCreationModal;