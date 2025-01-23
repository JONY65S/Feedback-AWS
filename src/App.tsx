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
import InsightFooter from "./components/InsightFooter"; // Agregar el segundo footer
import Test from "./pages/Test";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<><Home /><Footer /></>} />
        <Route path="/live-demo" element={<><Livedemo /><Footer /></>} />
        <Route path="/insights" element={<><Insights /><InsightFooter /></>} />
        <Route path="/features" element={<><Features /><Footer /></>} />
        <Route path="/contact" element={<><Contact /><Footer /></>} />
        <Route path="/0" element={<><Test /><Footer /></>} />
        {/* <Route path="/use-cases" element={<UseCases />} />
        <Route path="/about" element={<About />} />  */}
      </Routes>
      
      {/* Renderizar Footer principal en todas las páginas */}
 
    </Router>
  );
}

export default App;
