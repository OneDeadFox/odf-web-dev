import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"
import LandingPage from "./components/LandingPage/LandingPage";
import PortfolioPage from "./components/PortfolioPage/PortfolioPage"
import "./App.css";

export default function App() {
  const [screenType, setScreenType] = useState("");

  const getScreenSize = () => {
    //first condition needs the - 35, but may be because of googles insoect window rather than actual window inner width on a mobile device.
      //Reassess after deployment
    if(window.innerWidth - 35 <= 480) {
      setScreenType("isMobile");
    } else if(window.innerWidth >= 481 && window.innerWidth <= 768) {
      setScreenType("isTablet");
    } else {
      setScreenType("isDesktop")
    }
  }

  useEffect(() => {
    getScreenSize();
  }, [])

  return (
    <BrowserRouter basename="https://onedeadfox.github.io/odf-web-dev">
      <section
        className="background"
      >
      <Navbar screenType={screenType}/>
      <Routes>
        <Route path="/" element={
          <LandingPage screenType={screenType}/>
        }>
        </Route>
        <Route path="/about" element={
          <h1>About</h1>
        }>
        </Route>
        <Route path="/portfolio" element={
          <PortfolioPage screenType={screenType}/>
        }>
        </Route>
        <Route path="/skills" element={
          <h1>Skiils</h1>
        }>
        </Route>
        <Route path="/contact" element={
          <h1>Contact</h1>
        }>
        </Route>
        <Route path="*" element={
          <h1>404 Error Page Not Found</h1>
        }>
        </Route>
      </Routes>
      </section>
    </BrowserRouter>
  );
}
