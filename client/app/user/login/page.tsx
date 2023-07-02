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
import OrContinueWith from "@/app/components/OrContinueWith";
import VerificationEmail from "@/app/components/VerificationEmail";
import { apis } from "@/utils/constants";
import { useRouter } from "next/navigation";
import ForgotPassword from "@/app/components/ForgotPassword";

const Login = () => {
  const router = useRouter();
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
  const [isOnVerification, setIsOnVerification] = useState<boolean>(false);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserCredentials((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const changeMethod = () => {
    setMethod(method === 1 ? 2 : 1);
  };

  const showForgotPassword = () => {
    setIsForgotPassword(true);
  };

  const loginPost = async (): Promise<void> => {
    const data = await makePostRequest(apis.user.LOGIN, userCredentials);
    const response = await data.json();
    if (response.success) {
      const token = response.token;
      localStorage.setItem("token", token);
      router.push("/user/home");
    } else {
      setIsLoading(false);
      document.getElementById("username")?.focus();
      setErrorMessage(response.error);
    }
  };

  const generateCode = async (): Promise<void> => {
    const data = await makePostRequest(
      apis.email_code.GENERATE,
      userCredentials
    );
    const response = await data.json();
    if (response.success) {
      setIsOnVerification(true);
    } else {
      setErrorMessage(response.error);
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
  return (
    <main className="flex items-center h-screen justify-center w-full bg-black">
      <section className="p-7 shadow-xl border rounded-lg w-96 bg-white">
        {isOnVerification ? (
          <VerificationEmail
            setIsOnVerification={setIsOnVerification}
            setUsernameMessage={setUsernameMessage}
            userCredentials={userCredentials}
          />
        ) : isForgotPassword ? (
          <ForgotPassword setIsForgotPassword={setIsForgotPassword}/>
        ) : (
          <>
            <h1 className="text-2xl text-black mb-5">INICIAR SESION</h1>
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
              <p className="mb-3">{usernameMessage}</p>
              {method == 2 && (
                <EmailInput
                  handleChange={handleChange}
                  data={userCredentials}
                />
              )}
              <InputPassword
                register={method === 2}
                handleChange={handleChange}
                data={userCredentials}
              />
              <p className="text-rose-700">{errorMessage}</p>
              {method === 1 && (
                <span
                  onClick={showForgotPassword}
                  className="cursor-pointer ml-auto w-1/2 mt-3 text-sm text-blue-400 hover:text-blue-500"
                >
                  Olvidaste tu contrase&ntilde;a?
                </span>
              )}
              <Button text={method === 1 ? "Ingresar" : "Registrarme"} />
              {method === 1 ? (
                <p className="text-gray-500 text-sm text-center my-2">
                  A&uacute;n no tienes una cuenta?{" "}
                  <span
                    className="cursor-pointer text-blue-400 hover:text-blue-500"
                    onClick={changeMethod}
                  >
                    Registrate
                  </span>
                </p>
              ) : (
                <p className="text-gray-500 text-sm text-center my-2">
                  Ya tienes una cuenta?{" "}
                  <span
                    className="cursor-pointer text-blue-400 hover:text-blue-500"
                    onClick={changeMethod}
                  >
                    Inicia sesi&oacute;n
                  </span>
                </p>
              )}
              <OrContinueWith />
            </form>
            <button className="flex rounded-lg p-3 shadow border mb-2 w-full">
              <Image
                src="/assets/icons/google.svg"
                alt="google"
                className="mr-3"
                width="24"
                height="24"
              />
              Google
            </button>
            <button className="flex rounded-lg p-3 shadow border w-full">
              <Image
                src="/assets/icons/instagram.svg"
                alt="instagram"
                width="24"
                height="24"
                className="mr-3"
              />
              Instagram
            </button>
          </>
        )}
      </section>
    </main>
  );
};

export default Login;
