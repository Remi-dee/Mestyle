import { useRegisterMutation } from "@/redux/authApi";
import { setCredentials } from "@/redux/authSlice";
import { useDispatch } from "react-redux";

const HandleSignUp = () => {
  const [register] = useRegisterMutation();
  const dispatch = useDispatch();

  const signUp = async ({ username, email, password }) => {
    try {
      const response = await register({ username, email, password }).unwrap();

      // If registration is successful, update the Redux state
      if (response && response.accessToken) {
        dispatch(
          setCredentials({
            user: { email }, // Use username if needed
            accessToken: response.accessToken,
          })
        );
        console.log("User registered and state updated:", response);
        return { success: true };
      }
    } catch (error) {
      console.error("Error during registration:", error);
      return {
        success: false,
        error: error.data?.message || "Registration failed",
      };
    }
  };

  return { signUp };
};

export default HandleSignUp;
