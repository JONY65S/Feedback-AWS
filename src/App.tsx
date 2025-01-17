import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Livedemo from "./pages/LiveDemo";
import Insights from "./pages/Insights";
// import About from "./pages/About";
import Features from "./pages/Features";
// import UseCases from "./pages/UseCases";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live-demo" element={<Livedemo />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/use-cases" element={<UseCases />} />
        <Route path="/about" element={<About />} />  */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
