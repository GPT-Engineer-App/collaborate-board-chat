import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";
import { setItem, getItem } from "../utils/storage";

const UserManagement = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [currentUser, setCurrentUser] = useState(null); // Assuming you have a way to get the current user

  useEffect(() => {
    const fetchProject = async () => {
      const storedProjects = await getItem("projects");
      const currentProject = storedProjects.find((proj) => proj.id === parseInt(projectId));
      setProject(currentProject);
      // Assuming you have a way to get the current user
      const user = await getCurrentUser();
      setCurrentUser(user);
    };
    fetchProject();
  }, [projectId]);

  const handleAddUser = async () => {
    const updatedProject = {
      ...project,
      users: [...project.users, { email: newUserEmail, id: Date.now(), username: '', password: '' }],
    };
    const storedProjects = await getItem("projects");
    const updatedProjects = storedProjects.map((proj) =>
      proj.id === parseInt(projectId) ? updatedProject : proj
    );
    await setItem("projects", updatedProjects);
    setProject(updatedProject);
    setNewUserEmail("");
  };

  const handleRemoveUser = async (userId) => {
    const updatedProject = {
      ...project,
      users: project.users.filter((user) => user.id !== userId),
    };
    const storedProjects = await getItem("projects");
    const updatedProjects = storedProjects.map((proj) =>
      proj.id === parseInt(projectId) ? updatedProject : proj
    );
    await setItem("projects", updatedProjects);
    setProject(updatedProject);
  };

  if (!project) return <Text>Loading...</Text>;

  if (currentUser.id !== project.ownerId) return <Text>You do not have permission to view this page.</Text>;

  return (
    <Box p={4}>
      <Heading mb={4}>User Management for {project.name}</Heading>
      <VStack spacing={4} align="start">
        <Input
          placeholder="User Email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
        />
        <Button onClick={handleAddUser}>Add User</Button>
        {project.users.map((user) => (
          <Box key={user.id} p={2} bg="gray.100" rounded="md" width="100%">
            <Text>{user.email}</Text>
            <Button onClick={() => handleRemoveUser(user.id)}>Remove</Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default UserManagement;