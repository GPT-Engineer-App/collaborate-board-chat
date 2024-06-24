import { Box, Heading, VStack, HStack, Text, Button } from "@chakra-ui/react";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { users, initialData } from '../data/store';
import TicketCreationModal from '../components/TicketCreationModal';

const Kanban = () => {
  const [state, setState] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setState(newState);
  };

  const handleCreateTicket = (newTask) => {
    const newState = {
      ...state,
      tasks: {
        ...state.tasks,
        [newTask.id]: newTask,
      },
      columns: {
        ...state.columns,
        'column-1': {
          ...state.columns['column-1'],
          taskIds: [...state.columns['column-1'].taskIds, newTask.id],
        },
      },
    };
    setState(newState);
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Kanban Board</Heading>
      <Button onClick={() => setIsModalOpen(true)}>Create Ticket</Button>
      <TicketCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateTicket}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <HStack spacing={4} align="start">
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

            return (
              <Box key={column.id} bg="gray.100" p={4} rounded="md" width="300px">
                <Heading size="md" mb={4}>{column.title}</Heading>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <VStack
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      spacing={4}
                      minHeight="200px"
                    >
                      {tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              bg="white"
                              p={4}
                              rounded="md"
                              shadow="md"
                              width="100%"
                            >
                              <Text>{task.content}</Text>
                              <Text fontSize="sm" color="gray.500">Creator: {task.creator.username}</Text>
                              <Text fontSize="sm" color="gray.500">Assignee: {task.assignee.username}</Text>
                            </Box>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </VStack>
                  )}
                </Droppable>
              </Box>
            );
          })}
        </HStack>
      </DragDropContext>
    </Box>
  );
};

export default Kanban;