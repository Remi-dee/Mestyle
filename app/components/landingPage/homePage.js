import NavBar from "./NavBar/NavBar";

import Footer from "./Footer";
import Hero_comp from "./Hero/Hero_comp";
import Explore from "./Explore_comp";
import Contact from "./Contact_comp";
import CreatorCTA from "./CreatorCTA_comp";
import { Modal } from "@/app/composables/modal/modal";
import SignUp from "../authentication/signUp/SignUpForm_comp";
import SignIn from "../authentication/signIn/SignInForm_comp";
import ForgotPassword from "../authentication/ForgotPassword_comp";
import Authentication from "../authentication/authentication";

function HomePage() {
  return (
    <>
      <NavBar className="px-24" />
      <Hero_comp />
      <Explore />
      <CreatorCTA />
      <Contact />
      <Footer />
      <Authentication />
    </>
  );
}

export default HomePage;
