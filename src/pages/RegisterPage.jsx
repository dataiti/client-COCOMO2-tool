import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authSelect, registerThunkAction } from "../redux/features/authSlice";
import Button from "../components/Button";
import Loading from "../components/Loading";
import SocialForm from "../components/SocialForm";
import { toast } from "react-toastify";
import Input from "../components/Input";
import Label from "../components/Label";
import { loginThunkAction } from "../redux/features/authSlice";

const registerSchema = yup.object({
  //   email: yup.string().required("Bắt buộc !").email("Sai định dạng email !"),
  //   password: yup
  //     .string()
  //     .required("Bắt buộc !")
  //     .min(8, "Mật khẩu phải ít nhất 8 kí tự !")
  //     .max(20, "Mật khẩu phải tối đa 20 kí tự !"),
});

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(authSelect);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(registerSchema),
  });

  const handleSubmitSignUp = async (values) => {
    if (!isValid) {
      return;
    }
    setIsLoading(true);
    dispatch(registerThunkAction(values))
      .unwrap()
      .then(() => {
        setIsLoading(false);
        reset();
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSignUp)}
      className="w-[340px] px-8 pt-8 pb-14 rounded-3xl shadow-md bg-white"
    >
      <h3 className="text-center pb-3 text-3xl font-bold">Register</h3>
      {(isSubmitting || isLoading) && <Loading />}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <Label label="username" />
          <Input
            control={control}
            name="username"
            placeholder="Enter your username"
            className="rounded-full py-3 px-4"
            // errors={errors.password}
          />
        </div>
        <div className="flex flex-col">
          <Label label="Email" />
          <Input
            control={control}
            name="email"
            type="email"
            placeholder="Enter your email"
            className="rounded-full py-3 px-4"
            //   errors={errors.email}
          />
        </div>
        <div className="flex flex-col">
          <Label label="Password" />
          <Input
            control={control}
            name="password"
            type="password"
            placeholder="Enter your password"
            className="rounded-full py-3 px-4"
            isInputPassword
            // errors={errors.password}
          />
        </div>

        <Button
          primary
          className="w-full rounded-full text-base py-3 mt-2 bg bg-emerald-900 hover:bg-emerald-800"
        >
          Login
        </Button>
        {resultMessage && (
          <span className="mx-auto text-xs text-red-500">{resultMessage}</span>
        )}
      </div>
      <div className="mt-3 text-gray-500 flex items-center justify-between text-sm mx-3 font-semibold">
        <Link to="">Forgot password ?</Link>
        <Link to="/register">Register now</Link>
      </div>
      <span className="text-xs text-gray-500 flex justify-center py-1 font-semibold">
        Or
      </span>
      <SocialForm />
    </form>
  );
};

export default RegisterPage;
