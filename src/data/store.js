import { v4 as uuidv4 } from 'uuid';

const users = [
  { id: uuidv4(), username: 'Alice' },
  { id: uuidv4(), username: 'Bob' },
  { id: uuidv4(), username: 'Charlie' },
];

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out the garbage", creator: users[0], assignee: users[1] },
    "task-2": { id: "task-2", content: "Watch my favorite show", creator: users[1], assignee: users[2] },
    "task-3": { id: "task-3", content: "Charge my phone", creator: users[2], assignee: users[0] },
    "task-4": { id: "task-4", content: "Cook dinner", creator: users[0], assignee: users[1] },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

export { users, initialData };