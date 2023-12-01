import { FormProvider } from "../context/form/userProfile/FormContext";
import Form from "./components/form/userProfile/Template";
import PersonaliseScreen from "./components/ui/personaliseScreen/template";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center  justify-center">
      <PersonaliseScreen
        title="Get Personalized Outfit Recommendations"
        description={`At Mestyle, we're dedicated to helping you look and feel your best. To provide you with the most relevant outfit suggestions, please share some information with us. Rest assured that your data is kept secure and used only to enhance your style journey.`}
      >
        <FormProvider>
          <Form />
        </FormProvider>
      </PersonaliseScreen>
    </main>
  );
}
