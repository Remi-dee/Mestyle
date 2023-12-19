import NavBar from "./NavBar/NavBar";

import Footer from "./Footer";
import Hero_comp from "./Hero/Hero_comp";
import Explore from "./Explore_comp2";
import Contact from "./Contact_comp";
import CreatorCTA from "./creatorCTA_comp";

function HomePage() {
  return (
    <>
      <NavBar />
      <Hero_comp />
      <Explore />
      {/* <CreatorCTA /> */}
      <Contact />
      <Footer />
    </>
  );
}

export default HomePage;
