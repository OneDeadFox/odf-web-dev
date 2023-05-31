import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"

import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import Letter from "./components/Animations/Letter/Letter";


function App() {
  return (
    <BrowserRouter>
      <section
        className="test"
      >
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/about" element={<h1>About</h1>}></Route>
        <Route path="/portfolio" element={<h1>Portfolio</h1>}></Route>
        <Route path="/skills" element={<h1>Skiils</h1>}></Route>
        <Route path="/contact" element={<h1>Contact</h1>}></Route>
        <Route path="*" element={<h1>404 Error Page Not Found</h1>}></Route>
      </Routes>
      </section>
    </BrowserRouter>
  );
}

export default App;
