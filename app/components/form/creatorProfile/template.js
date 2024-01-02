"use client";

import Overlay from "@/app/components/ui/overlay/template";
import useFormContext from "@/hooks/creatorProfile/useFormContext";
import ButtonWithArrowRight from "./utils/CustomButton";
import FormSelector from "./utils/FormSelector";

const buttonProps = [
  {
    type: "button",
    variant: "secondary",
    buttonText: "Next",
  },
  {
    buttonText: "Upload Your Style Content ",
  },
  {
    buttonText: "Publish Your Style Content ",
  },
];

function Form() {
  const { formTitle, formDescription, formStep, handleSubmit, handleNext } =
    useFormContext();

  const buttonClass =
    "dark:bg-white dark:text-black focus:ring-0 flex items-center justify-center gap-x-2";

  const currentButtonProps = buttonProps[formStep];

  if (!currentButtonProps) {
    console.error(`Unexpected form step: ${formStep}`);
    setErrors({ formStep: "Unexpected form step" });
    return;
  }

  return (
    <Overlay title={formTitle} description={formDescription} className="">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12"
      >
        <FormSelector />

        <ButtonWithArrowRight
          onClick={handleNext}
          className={buttonClass}
          {...currentButtonProps}
        />
      </form>
    </Overlay>
  );
}

export default Form;
