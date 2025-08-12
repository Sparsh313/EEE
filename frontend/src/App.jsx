// /App.jsx (

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Learning from "./pages/Learning";
import ProjectDetail from "./pages/ProjectDetail";
// import TopicDetail from "./pages/TopicDetail";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/learning" element={<Learning />} />
          {/* <Route path="/learning/:slug" element={<TopicDetail />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

// import Navbar from "./components/navbar";

// function App() {
//   return (
//     <>
//       <Navbar />
//     </>
//   );
// }
export default App;
