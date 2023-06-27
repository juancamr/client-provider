"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import InputUsername from "../../components/inputs/UserName";
import { makePostRequest } from "@/utils/api";
import { User } from "../../../models/user.model";
import InputPassword from "@/app/components/inputs/Password";
import InputText from "@/app/components/inputs/InputText";
import Button from "@/app/components/inputs/Button";
import Loader from "@/app/components/dialog/Loader";
import Image from "next/image";
import EmailInput from "@/app/components/inputs/EmailInput";

interface Response {
  success: boolean;
  message?: string;
  user?: any;
  error: string;
}

const Login = () => {
  useEffect(() => {
    document.getElementById("username")?.focus();
  }, []);
  const [userCredentials, setUserCredentials] = useState<User>({
    username: "",
    email: "",
    password: "",
    name: "",
    last_name: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [usernameMessage, setUsernameMessage] = useState<string>("");
  const [method, setMethod] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isOnVerification, setIsOnVerification] = useState<boolean>(false);
  const [verificationCodeMessage, setVerificationCodeMessage] =
    useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserCredentials((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const updateVerificationCode = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setVerificationCode(value);
  };

  const changeMethod = () => {
    setMethod(method === 1 ? 2 : 1);
  };

  const loginPost = async (): Promise<void> => {
    const data = await makePostRequest("/api/user/login", userCredentials);
    const response: Response = await data.json();
    if (response.success) {
      window.location.replace("/user/home");
    } else {
      setIsLoading(false);
      document.getElementById("username")?.focus();
      setErrorMessage(response.error);
    }
  };

  const registerPost = async (): Promise<void> => {
    const data = await makePostRequest("/api/user/register", userCredentials);
    const response: Response = await data.json();
    if (response.success) {
      window.location.replace("/user/home");
    } else {
      setIsLoading(false);
      setIsOnVerification(false);
      document.getElementById("username")?.focus();
      setUsernameMessage(response.error);
    }
  };

  const generateCode = async (): Promise<void> => {
    const data = await makePostRequest(
      "/api/verification_code/generate",
      userCredentials
    );
    const response: Response = await data.json();
    if (response.success) {
      setIsOnVerification(true);
    } else {
      console.log("no se pudo enviar el correo");
    }
  };

  const checkCode = async (): Promise<void> => {
    const data = await makePostRequest("/api/verification_code/verify", {
      email: userCredentials.email,
      code: verificationCode,
    });
    const response = await data.json();
    if (response.success) {
      setIsLoading(true);
      registerPost();
    } else {
      setVerificationCodeMessage(response.error);
    }
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (method === 1) {
      setIsLoading(true);
      loginPost();
    } else {
      generateCode();
    }
  };

  const verifyCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    checkCode();
  };

  if (isLoading) {
    return (
      <main className="flex items-center justify-center h-screen">
        <Loader />
      </main>
    );
  } else if (isOnVerification) {
    return (
      <main className="flex items-center justify-center h-screen">
        <form onSubmit={verifyCode}>
          <InputText
            handleChange={updateVerificationCode}
            data={verificationCode}
            name="code"
            label="Code"
          />
          <p>{verificationCodeMessage}</p>
          <button>SUBMIT</button>
        </form>
      </main>
    );
  } else {
    return (
      <main className="flex items-center h-screen justify-center w-full">
        <section className="grid">
          <form onSubmit={submitForm} className="grid">
            {method == 2 && (
              <div>
                <InputText
                  handleChange={handleChange}
                  data={userCredentials}
                  name="name"
                  label="Nombres"
                />
                <InputText
                  handleChange={handleChange}
                  data={userCredentials}
                  name="last_name"
                  label="Apellidos"
                />
              </div>
            )}
            <InputUsername
              register={method === 2}
              handleChange={handleChange}
              data={userCredentials}
            />
            <p>{usernameMessage}</p>
            {method == 2 && (
              <EmailInput handleChange={handleChange} data={userCredentials} />
            )}
            <InputPassword
              register={method === 2}
              handleChange={handleChange}
              data={userCredentials}
            />
            <p>{errorMessage}</p>
            <Button text={method === 1 ? "Ingresar" : "Registrarme"} />
            {method === 1 ? (
              <p>
                A&uacute;n no tienes una cuenta?{" "}
                <span
                  className="cursor-pointer text-blue-400"
                  onClick={changeMethod}
                >
                  Registrate
                </span>
              </p>
            ) : (
              <p>
                Ya tienes una cuenta?{" "}
                <span
                  className="cursor-pointer text-blue-400"
                  onClick={changeMethod}
                >
                  Inicia sesi&oacute;n
                </span>
              </p>
            )}
            <p className="text-center mt-5">O continua con</p>
          </form>
          <button className="flex rounded p-3 shadow-lg mt-5">
            <Image
              src="/assets/icons/google.svg"
              alt="google"
              className="mr-3"
              width="24"
              height="24"
            />
            Google
          </button>
          <button className="flex rounded p-3 shadow-lg mt-5">
            <Image
              src="/assets/icons/instagram.svg"
              alt="instagram"
              width="24"
              height="24"
              className="mr-3"
            />
            Instagram
          </button>
        </section>
      </main>
    );
  }
};

export default Login;
