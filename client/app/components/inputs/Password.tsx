"use client";
import { ChangeEvent, useState } from "react";
import { Freelancer } from "@/models/freelancer.model";
import { User } from "@/models/user.model";
import { ChangeEventHandler } from "react";

export default function InputPassword({
  handleChange,
  data,
  register,
}: {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  data: User | Freelancer;
  register: boolean;
}) {
  const [helpMessage, setHelpMessage] = useState<string>("");

  const updateMessage = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const hasNumber = /[0-9]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const isGreater = value.length >= 10;

    if (isGreater) {
      if (hasNumber) {
        if (hasUpperCase) {
          setHelpMessage("Perfecto");
        } else {
          setHelpMessage("mayúscula");
        }
      } else {
        setHelpMessage("Debe tener al menos un numero");
      }
    } else {
      setHelpMessage("10 caracteres");
    }
  };

  return (
    <>
      <label htmlFor="password" className="text-gray-600 mb-1">Contrase&ntilde;a</label>
      <input
        className="rounded border p-1 px-2"
        onChange={(event) => {
          updateMessage(event);
          handleChange(event);
        }}
        value={data.password}
        name="password"
        type="password"
      />
      {register && <p>{helpMessage}</p>}
    </>
  );
}
