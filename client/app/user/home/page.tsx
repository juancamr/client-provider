import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen">
      <section className="grid">
        <h1 className="text-dark">Hola mundo</h1>
        <Link className="text-red-500" href="/user/login">
          Sign out
        </Link>
      </section>
    </main>
  );
}
