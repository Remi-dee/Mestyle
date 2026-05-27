import { useRegisterMutation } from "@/app/redux/features/auth/authApi";
import { setCredentials } from "@/app/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

const HandleSignUp = () => {
  
  const [register, { isLoading, error }] = useRegisterMutation();
  const dispatch = useDispatch();

  const signUp = async ({
    userData,
  }: {
    userData: { username: string; email: string; password: string };
  }) => {
    const { username, email, password } = userData;
    try {
      const response = await register({ username, email, password }).unwrap();

      if (response && response.access_token) {
        dispatch(
          setCredentials({
            user: { email },
            accessToken: response.access_token,
          })
        );
        console.log("User registered and state updated:", response);
        return { success: true };
      }
    } catch (error: any) {
      console.error("Error during registration:", error);
      return {
        success: false,
        error: error?.data?.message || "Registration failed",
      };
    }
  };

  return { signUp };
};

export default HandleSignUp;
