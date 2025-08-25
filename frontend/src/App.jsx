import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Learning from "./pages/Learning";
import ProjectDetail from "./pages/ProjectDetail";
import TopicDetail from "./pages/TopicDetail";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/Dashborad";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateTopic from "./pages/admin/CreateTopic";
// import UpdateTopic from "./pages/admin/topics/UpdateTopic";
import CreateProject from "./pages/admin/CreateProject";
import UpdateProject from "./pages/admin/UpdateProject";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="px-4 py-6">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/learning/:slug" element={<TopicDetail />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/topic/create" element={<CreateTopic />} />
          {/* <Route path="/admin/topic/edit/:slug" element={<UpdateTopic />} /> */}
          <Route path="/admin/project/create" element={<CreateProject />} />
          <Route path="/admin/project/edit/:slug" element={<UpdateProject />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
