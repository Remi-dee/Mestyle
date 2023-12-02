import { FormProvider } from "../context/form/userProfile/FormContext";
import Form from "./components/form/userProfile/template";
import Hero from "./components/landingPage/Hero_comp";
import Explore from "./components/landingPage/Explore_comp";
import Navbar from "./components/landingPage/navbar";
import PersonaliseScreen from "./components/ui/personaliseScreen/template";
import Creator from "./components/landingPage/Creator_comp";

export default function Home() {
  return (
    <main className=" min-h-screen ">
     <Hero/>
     <Explore/>
     <Creator/>
      {/* <PersonaliseScreen
        title="Get Personalized Outfit Recommendations"
        description={`At Mestyle, we're dedicated to helping you look and feel your best. To provide you with the most relevant outfit suggestions, please share some information with us. Rest assured that your data is kept secure and used only to enhance your style journey.`}
      >
        <FormProvider>
          <Form />
        </FormProvider>
      </PersonaliseScreen>  */}
    </main>
  );
}
