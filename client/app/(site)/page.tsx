"use client";
import Button from "../components/inputs/Button";
import { signIn } from "next-auth/react";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <h1>Welcome guys!</h1>
        <Button text="Iniciar sesion" onClick={() => signIn()} />
      </div>
    </div>
  );
};

export default Home;
