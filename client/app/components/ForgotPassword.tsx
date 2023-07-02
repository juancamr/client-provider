"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import EmailInput from "./inputs/EmailInput";
import Button from "./inputs/Button";
import { makePostRequest } from "@/utils/api";
import { apis } from "@/utils/constants";

export default function ForgotPassword(props: {
  setIsForgotPassword: Function;
}) {
  const { setIsForgotPassword } = props;
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userCredentials, setUserCredentials] = useState<object>({
    email: "",
  });
  const changeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserCredentials({ email: value });
  };

  const changeToLogin = () => {
    setIsForgotPassword(false);
  };

  const sendEmail = async () => {
    const data = await makePostRequest(
      apis.user.FORGOT_PASSWORD,
      userCredentials
    );
    const response = await data.json();
    if (response.success) {
      setIsSuccess(true);
    } else {
      setErrorMessage(response.error);
    }
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendEmail();
  };

  return (
    <>
      {isSuccess ? (
        <p>El correo para recuperar fue enviado</p>
      ) : (
        <form onSubmit={submitForm}>
          <EmailInput handleChange={changeEmail} data={userCredentials} />
          <p>{errorMessage}</p>
          <div className="w-1/2 my-2">
            <Button text="Enviar correo" />
          </div>
        </form>
      )}
      <span
        onClick={changeToLogin}
        className="text-blue-500 hover:text-blue-600 cursor-pointer"
      >
        Iniciar sesion
      </span>
    </>
  );
}
