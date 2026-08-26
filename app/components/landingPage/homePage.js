import NavBar from "./NavBar/NavBar";
import Footer from "./Footer";
import LandingHero from "./LandingHero";
import LandingSections from "./LandingSections";
import Authentication from "../authentication/authentication";

function HomePage() {
  return (
    <>
      <NavBar className="px-24" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <LandingHero />
      </div>
      <LandingSections />
      <Footer />
      <Authentication />
    </>
  );
}

export default HomePage;
