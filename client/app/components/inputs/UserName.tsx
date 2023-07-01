"use client";
import { Freelancer } from "@/models/freelancer.model";
import { User } from "@/models/user.model";
import { makePostRequest } from "@/utils/api";
import { ChangeEvent, ChangeEventHandler, useState } from "react";

export default function UserName(props: {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  data: User | Freelancer;
  register: boolean;
}) {
  const { handleChange, data, register } = props;
  const [userMessage, setUserMessage] = useState<string>("");

  const checkIfUserExist = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const response = await makePostRequest("/api/user/is_username_exist", {
      username: value,
    });
    const res: any = await response.json();
    if (res.success) {
      setUserMessage(`${value} se encuentra en uso`);
    } else {
      setUserMessage("Perfecto");
    }
  };

  return (
    <>
      <label htmlFor="username" className="text-gray-600 mb-1">Usuario</label>
      <input
        id="username"
        autoComplete="off"
        className="rounded border p-1 px-2"
        onChange={(event) => {
          if (register) {
            if (event.target.value.length >= 5) {
              checkIfUserExist(event);
            } else {
              setUserMessage("5 caracteres");
            }
          }
          handleChange(event);
        }}
        value={data.username}
        name="username"
        type="text"
      />
      {register && (
        <div className="h-6 text-gray-500">
          <p>{userMessage}</p>
        </div>
      )}
    </>
  );
}
