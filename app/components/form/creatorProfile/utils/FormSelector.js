import useFormContext from "@/hooks/creatorProfile/useFormContext";
import BodyType from "../BodyType";
import FashionStyle from "../FashionStyle";
import UploadContent from "../UploadContent";

function FormSelector() {
  const { formStep } = useFormContext();

  /**
   * Defines the form components for each step
   * @type {Array}
   */
  const formComponents = [
    <FashionStyle key={0} />,
    <BodyType key={1} />,
    <UploadContent key={2} />,
  ];

  // Checks if formStep is a valid index
  if (formStep < 0 || formStep >= formComponents.length) {
    console.error(`Unexpected form step: ${formStep}`);
    return null;
  }

  return <div>{formComponents[formStep]}</div>;
}

export default FormSelector;
