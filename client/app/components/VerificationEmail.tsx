import { ChangeEvent, FormEvent, useState } from "react";
import InputText from "./inputs/InputText";
import { makePostRequest } from "@/utils/api";
import { User } from "@/models/user.model";
import { apis } from "@/utils/constants";

export default function VerificationEmail(props: {
  userCredentials: User;
  setIsOnVerification: Function;
  setUsernameMessage: Function;
}) {
  const { userCredentials, setIsOnVerification, setUsernameMessage } = props;
  const [verificationCodeMessage, setVerificationCodeMessage] =
    useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");

  const updateVerificationCode = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setVerificationCode(value);
  };

  const checkCode = async (): Promise<void> => {
    const data = await makePostRequest(apis.email_code.VERIFY, {
      email: userCredentials.email,
      code: verificationCode,
    });
    const response = await data.json();
    if (response.success) {
      registerPost();
    } else {
      setVerificationCodeMessage(response.error);
    }
  };

  const verifyCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    checkCode();
  };

  const registerPost = async (): Promise<void> => {
    const data = await makePostRequest(apis.user.REGISTER, userCredentials);
    const response = await data.json();
    if (response.success) {
      window.location.replace("/user/home");
    } else {
      setIsOnVerification(false);
      document.getElementById("username")?.focus();
      setUsernameMessage(response.error);
    }
  };

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
}
