import { Modal } from "@/app/composables/modal/modal";
import ForgotPassword from "./ForgotPassword_comp";
import { useRouter, useSearchParams } from "next/navigation";
import SignUp from "./signUp/SignUpForm_comp";
import SignIn from "./signIn/SignInForm_comp";


function Authentication() {
  const view = useSearchParams().get("view");
  const router = useRouter();

  return (
    <div className=" font-lexend">
      <>
        <div>
          {view == "signup" ? (
            <Modal
              onClose={() => {
                router.push("/");
              }}
            >
              <SignUp
                onClose={() => {
                  router.push("/");
                }}
              />
            </Modal>
          ) : view == "signin" ? (
            <Modal
              onClose={() => {
                router.push("/");
              }}
            >
              <SignIn
                onClose={() => {
                  router.push("/");
                }}
              />
            </Modal>
          ) : view == "forgotpassword" ? (
            <Modal
              onClose={() => {
                router.push("/");
              }}
            >
              <ForgotPassword
                onClose={() => {
                  router.push("/");
                }}
              />
            </Modal>
          ) : (
            <div></div>
          )}
        </div>
      </>
    </div>
  );
}

export default Authentication;
