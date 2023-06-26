import React from "react";

export default function Button(props: { text: string }) {
  return <button className="bg-black rounded shadow mt-5 text-white p-2">{props.text}</button>;
}
