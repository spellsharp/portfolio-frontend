import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import "./App.css";
import NotFoundPage from "./pages/NotFoundPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import PageTransition from "./components/PageTransition";
import { useState, useEffect } from "react";

const getRandomPosition = (positions) => {
  const index = Math.floor(Math.random() * positions.length);
  return positions[index];
};

const xPositions = [-50, 0, 50];
const yPositions = [-50, 0, 0, 0, 50];

const pageTransition = {
  hidden: {
    opacity: 0,
    x: -1* getRandomPosition(xPositions),
    y: -1 * getRandomPosition(yPositions),
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    x: Math.abs(getRandomPosition(xPositions)),
    y: Math.abs(getRandomPosition(yPositions)),
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageTransition}
            >
              <Navbar />
              <HomePage />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageTransition}
            >
              <Navbar />
              <AboutPage />
            </motion.div>
          }
        />
        <Route
          path="/projects"
          element={
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageTransition}
            >
              <Navbar />
              <ProjectsPage />
            </motion.div>
          }
        />
        <Route
          path="/contact"
          element={
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageTransition}
            >
              <Navbar />
              <ContactPage />
            </motion.div>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
};
const App = () => {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowPage(true);
    }, 3000);
  }, []);

  return (
    <div className="App">
      <Router>
        {/* {showPage ? <AnimatedRoutes /> : <PageTransition />} */}
        <AnimatedRoutes />
      </Router>
    </div>
  );
};

export default App; 