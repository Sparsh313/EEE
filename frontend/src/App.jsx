// /App.jsx (

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
// import Projects from "./pages/Projects";
// import ProjectDetail from "./pages/ProjectDetail";
// import Learn from "./pages/Learn";
// import TopicDetail from "./pages/TopicDetail";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} /> 
          {/* <Route path="/projects" element={<Projects />} /> */}
          {/* <Route path="/projects/:slug" element={<ProjectDetail />} /> */}
          {/* <Route path="/learning" element={<Learn />} /> */}
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
