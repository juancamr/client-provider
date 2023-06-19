"use client";
import { useState, ChangeEvent, useEffect, FormEvent } from "react";

interface user {
  username: string;
  password: string;
}

const Login = () => {
  const [userCredentials, setUserCredentials] = useState<user>({
    username: "",
    password: "",
  });

  const loginPost = async () => {
    await fetch("http://192.168.1.131:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserCredentials((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    loginPost()
  }

  return (
    <main className="mx-auto">
      <form onSubmit={submitForm}>
        <label htmlFor="username">Username</label>
        <input
          onChange={handleChange}
          value={userCredentials.username}
          name="username"
          type="text"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          value={userCredentials.password}
          name="password"
          type="text"
        />
        <button>Ingresar</button>
      </form>
    </main>
  );
}

export default Login;
