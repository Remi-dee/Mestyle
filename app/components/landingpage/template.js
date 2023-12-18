import React from "react";
import NavBar from "./NavBar";
import Hero from "./Hero";
import About from "./About";
import Footer from "./Footer";
import Hero_comp from "./Hero/Hero_comp";

function HomePage() {
  return (
    <>
      <NavBar />
      <Hero_comp />
      <About />
      <Footer />
    </>
  );
}

export default HomePage;
