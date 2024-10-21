import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { signUpSchema, type TFormInputs } from "@validation/signUpSchema";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthRegister } from "@store/auth/authSlice";
import { useNavigate } from "react-router-dom";
function useRegister() {
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<TFormInputs>({
    resolver: zodResolver(signUpSchema),
  });
  const { error, accessToken, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TFormInputs> = async (data) => {
    const { firstName, email, lastName, password } = data;
    dispatch(actAuthRegister({ firstName, email, lastName, password }))
      .unwrap()
      .then(() => navigate("/login?message=account_created"));
  };

  const {
    checkEmailAvailability,
    resetState,
    loading: emailAvailabilityStatus,
    enterEmail,
  } = useCheckEmailAvailability();

  const emailCheckAvailability = async (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    await trigger("email");
    const { isDirty, invalid } = getFieldState("email");
    const value = e.target.value;

    if (isDirty && !invalid && enterEmail !== value) {
      checkEmailAvailability(value);
    }
    console.log(invalid, enterEmail);

    if (isDirty && invalid && enterEmail) {
      resetState();
    }
  };

  return {
    register,
    handleSubmit,
    emailCheckAvailability,
    emailAvailabilityStatus,
    onSubmit,
    error,
    accessToken,
    loading,
    errors
  };
}

export default useRegister;
