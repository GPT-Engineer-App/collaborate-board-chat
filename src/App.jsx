import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Projects from "./pages/Projects.jsx";
import Navbar from "./components/Navbar.jsx";
import Kanban from "./pages/Kanban.jsx";
import Chat from "./pages/Chat.jsx";
import Notes from "./pages/Notes.jsx";
import UserManagement from "./pages/UserManagement.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId/kanban" element={<Kanban />} />
        <Route path="/projects/:projectId/chat" element={<Chat />} />
        <Route path="/projects/:projectId/notes" element={<Notes />} />
        <Route path="/projects/:projectId/users" element={<UserManagement />} />
      </Routes>
    </Router>
  );
}

export default App;