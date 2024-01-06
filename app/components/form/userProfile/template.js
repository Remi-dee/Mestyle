"use client";

import useFormContext from "@/hooks/userProfile/useFormContext";
import Button from "@/app/components/ui/button/button";
import Overlay from "@/app/components/ui/overlay/template";
import FormSelector from "./utils/formSelector";


function Form() {
  const { formTitle, formDescription, formStep, handleSubmit, handleNext } =
    useFormContext();

  const buttonClass = "dark:bg-white dark:text-black focus:ring-0";

  return (
    <Overlay title={formTitle} description={formDescription} className="">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12"
      >
        <FormSelector />
        {formStep === 0 ? (
          <Button
            type="button"
            variant="secondary"
            onClick={handleNext}
            className={buttonClass}
          >
            Next
          </Button>
        ) : (
          <Button type="submit" variant="secondary" className={buttonClass}>
            Submit
          </Button>
        )}
      </form>
    </Overlay>
  );
}

export default Form;
