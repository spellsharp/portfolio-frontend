import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/misc/Navbar";
import Footer from "./components/misc/Footer";
import HomePage from "./pages/home/HomePage";
import ResearchPage from "./pages/research/ResearchPage";
import AboutPage from "./pages/about/AboutPage";
import ContactPage from "./pages/contact/ContactPage";
import NotFoundPage from "./pages/notfound/NotFoundPage";

const fade = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.18, ease: "easeIn" } },
};

const Page = ({ children }) => (
  <motion.main initial="hidden" animate="visible" exit="exit" variants={fade}>
    {children}
  </motion.main>
);

// Route changes should start at the top; in-page hashes handle themselves.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page><HomePage /></Page>} />
        <Route path="/research" element={<Page><ResearchPage /></Page>} />
        <Route path="/about" element={<Page><AboutPage /></Page>} />
        <Route path="/contact" element={<Page><ContactPage /></Page>} />
        <Route path="*" element={<Page><NotFoundPage /></Page>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <Router>
    <ScrollToTop />
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">
        <AnimatedRoutes />
      </div>
      <Footer />
    </div>
  </Router>
);

export default App;
