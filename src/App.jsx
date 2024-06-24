import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Kanban from "./pages/Kanban.jsx";
import Chat from "./pages/Chat.jsx";
import Notes from "./pages/Notes.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/kanban" element={<Kanban />} />
        <Route exact path="/chat" element={<Chat />} />
        <Route exact path="/notes" element={<Notes />} />
      </Routes>
    </Router>
  );
}

export default App;