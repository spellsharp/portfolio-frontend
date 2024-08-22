import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import "./App.css";
import NotFoundPage from "./pages/NotFoundPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import PageTransition from "./components/PageTransition";
import { useState, useEffect } from "react";

const App = () => {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowPage(true);
    }, 2000);
  }, []);

  const ResumeRedirect = () => {
    useEffect(() => {
      window.location.href = "https://www.overleaf.com/project/660573df19b75ee01e84f206";
    }, []);
    
    return null;
  };

  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            {showPage ? (
              <>
                <Route
                  path="/"
                  element={
                    <>
                      <Navbar />
                      <HomePage />
                    </>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <>
                      <Navbar />
                      <AboutPage />
                    </>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <>
                      <Navbar />
                      <ProjectsPage />
                    </>
                  }
                />

                <Route
                  path="/contact"
                  element={
                    <>
                      <Navbar />
                      <ContactPage />
                    </>
                  }
                />
                <Route
                  path="/resume"
                  element={
                    <>
                      <ResumeRedirect />
                    </>
                  }
                />
                <Route
                  path="*"
                  element={
                    <>
                      <NotFoundPage />
                    </>
                  }
                />
              </>
            ) : (
              <Route path="*" element={<PageTransition />} />
            )}
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
