import Overlay from "@/app/components/ui/overlay/template";
import useFormContext from "@/hooks/creatorProfile/useFormContext";
import ButtonWithArrowRight from "./utils/CustomButton";
import FormSelector from "./utils/FormSelector";

function Form() {
  const { formTitle, formDescription, formStep, handleSubmit, handleNext } =
    useFormContext();

  const buttonClass = "dark:bg-white dark:text-black focus:ring-0 flex gap-x-2";

  const buttonProps = [
    {
      type: "button",
      variant: "secondary",
      buttonText: "Next",
      onClick: handleNext,
    },
    {
      buttonText: "Upload Your Style Content ",
      onClick: handleNext,
    },
    {
      buttonText: "Publish Your Style Content ",
      onClick: handleSubmit,
    },
  ];

  const currentButtonProps = buttonProps[formStep];

  if (!currentButtonProps) {
    throw new Error(`Unexpected form step: ${formStep}`);
  }

  return (
    <Overlay title={formTitle} description={formDescription}>
      <form onSubmit={handleSubmit}>
        <FormSelector />
      <div className="flex flex-col justify-center items-center mt-4">
        <ButtonWithArrowRight
          onClick={currentButtonProps.onClick}
          className={buttonClass}
          {...currentButtonProps}
        />
      </div>
      </form>
    </Overlay>
  );
}

export default Form;
