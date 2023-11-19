'use client'
import { FormProvider } from "../context/form/userProfile/FormContext";
import Form from "./components/form/userProfile/template";
import HomePage from "./components/landingpage/template";
import PersonaliseScreen from "./components/ui/personaliseScreen/template";

export default function Home() {
  return (
    <main>
      <HomePage />
    </main>
  );
}
