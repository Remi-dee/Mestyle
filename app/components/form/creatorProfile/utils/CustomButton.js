import Button from "@/app/components/ui/button/button";


const ButtonWithArrowRight = ({ onClick, className, buttonText }) => (
  <Button
    type="button"
    variant="secondary"
    className={className}
    onClick={onClick}
  >
    {buttonText}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
    >
      <path
        d="M4.66675 10H16.3334"
        stroke="#363939"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 4.16602L16.3333 9.99935L10.5 15.8327"
        stroke="#363939"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Button>
);

export default ButtonWithArrowRight;
