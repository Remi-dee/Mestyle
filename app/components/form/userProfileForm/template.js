"use client";

import useFormData from "../../../../hooks/userProfile/userForm/useFormData";
import Button from "../../ui/button/template";
import Overlay from "../../ui/overlay/template";
import FormSelector from "./formSelector";

function UserForm() {
  const { formTitle, formDescription, formStep, handleSubmit, handleNext } =
    useFormData();

  return (
    <Overlay title={formTitle[formStep]} description={formDescription[formStep]}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12"
      >
        <FormSelector />

        {formStep === 0 ? (
          <Button
            type="submit"
            variant="secondary"
            onClick={handleNext}
            className="disabled:opacity-75 enabled:cursor-pointer enabled:opacity-100
            dark:bg-white dark:text-black focus:ring-0 transition-opacity"
            disabled={!handleNext}
          >
            Next
          </Button>
        ) : (
          <Button
            type="submit"
            variant="secondary"
            onClick={handleSubmit}
            disabled={!handleSubmit}
            className="dark:bg-white dark:text-black focus:ring-0 transition-opacity"
          >
            Submit
          </Button>
        )}
      </form>
    </Overlay>
  );
}

export default UserForm;
