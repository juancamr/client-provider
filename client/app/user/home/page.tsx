"use client";
import Button from "@/app/components/inputs/Button";
import { makePatchRequest } from "@/utils/api";
import { apis } from "@/utils/constants";
import { signOut, useSession } from "next-auth/react";
import React from "react";

export default function Home() {
  const { data: session } = useSession();

  const makeTest = async () => {
    const data = await makePatchRequest(
      apis.user.UPDATE_PROFILE,
      { name: "hola mundo" },
      session?.user.accessToken as string
    );
    const res = await data.json();

    if (res.success) {
      console.log(res.message);
    } else {
      console.log("no estas autorizado");
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div>
          WELCOME BACK!
          <Button onClick={() => signOut()} text="Cerrar sesion" />
          <Button onClick={makeTest} text="Test" />
        </div>
      </div>
    </>
  );
}
