import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Button, Input, VStack, Heading } from "@chakra-ui/react";
import { setItem, getItem } from "../utils/storage";
import Kanban from "./Kanban.jsx";
import Chat from "./Chat.jsx";
import Notes from "./Notes.jsx";
import UserManagement from "./UserManagement.jsx";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const storedProjects = await getItem("projects");
      if (storedProjects) {
        setProjects(storedProjects);
      }
    };
    fetchProjects();
  }, []);

  const handleCreateProject = async () => {
    const newProject = {
      id: Date.now(),
      name: newProjectName,
      kanban: [],
      chat: [],
      notes: [],
      users: [],
    };
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    await setItem("projects", updatedProjects);
    setNewProjectName("");
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Projects</Heading>
      <VStack spacing={4} align="start">
        <Input
          placeholder="New Project Name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />
        <Button onClick={handleCreateProject}>Create Project</Button>
        {projects.map((project) => (
          <Button key={project.id} onClick={() => navigate(`/projects/${project.id}`)}>
            {project.name}
          </Button>
        ))}
      </VStack>
      <Routes>
        <Route path=":projectId/kanban" element={<Kanban />} />
        <Route path=":projectId/chat" element={<Chat />} />
        <Route path=":projectId/notes" element={<Notes />} />
        <Route path=":projectId/users" element={<UserManagement />} />
      </Routes>
    </Box>
  );
};

export default Projects;