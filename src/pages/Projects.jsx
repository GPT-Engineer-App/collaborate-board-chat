import { useEffect, useState } from "react";
import { useNavigate, Routes, Route, useParams } from "react-router-dom";
import { users } from '../data/store';
import { Box, Button, Input, VStack, Heading } from "@chakra-ui/react";
import { setItem, getItem, removeItem } from "../utils/storage";
import Kanban from "./Kanban.jsx";
import Chat from "./Chat.jsx";
import Notes from "./Notes.jsx";
import UserManagement from "./UserManagement.jsx";

const currentUser = users[0]; // Assuming the first user is the current user

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [sessionProjects, setSessionProjects] = useState([]);
  const [showCreateProjectForm, setShowCreateProjectForm] = useState(false);
  const navigate = useNavigate();
  const { projectId } = useParams();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const storedSessionProjects = await getItem("sessionProjects");
        if (storedSessionProjects) {
          setProjects(storedSessionProjects);
          setSessionProjects(storedSessionProjects);
        } else {
          const storedProjects = await getItem("projects");
          if (storedProjects) {
            setProjects(storedProjects);
            setSessionProjects(storedProjects);
          }
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const updateSessionProjects = async () => {
      try {
        await setItem("sessionProjects", projects);
      } catch (error) {
        console.error("Error updating session projects:", error);
      }
    };
    updateSessionProjects();
  }, [projects]);

  const handleCreateProject = async () => {
    const newProject = {
      id: Date.now(),
      name: newProjectName,
      ownerId: currentUser.id, // Assuming you have a way to get the current user
      kanban: {
        tasks: {},
        columns: {
          "column-1": { id: "column-1", title: "To do", taskIds: [] },
          "column-2": { id: "column-2", title: "In progress", taskIds: [] },
          "column-3": { id: "column-3", title: "Done", taskIds: [] },
        },
        columnOrder: ["column-1", "column-2", "column-3"],
      },
      chat: [],
      notes: [],
      users: [],
    };
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    setSessionProjects(updatedProjects);
    await setItem("projects", updatedProjects);
    await setItem("sessionProjects", updatedProjects);
    setNewProjectName("");
    setShowCreateProjectForm(false);
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Projects</Heading>
      {!projectId && (
        <VStack spacing={4} align="start">
          <Button onClick={() => setShowCreateProjectForm(!showCreateProjectForm)}>
            {showCreateProjectForm ? "Cancel" : "Create New Project"}
          </Button>
          {showCreateProjectForm && (
            <>
              <Input
                placeholder="New Project Name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
              />
              <Button onClick={handleCreateProject}>Create Project</Button>
            </>
          )}
          {projects.map((project) => (
            <Button key={project.id} onClick={() => navigate(`/projects/${project.id}`)}>
              {project.name}
            </Button>
          ))}
        </VStack>
      )}
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