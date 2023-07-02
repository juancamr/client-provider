import React from "react";

export default function Button(props: { text: string }) {
  return <button className="bg-indigo-700 hover:bg-indigo-800 rounded shadow text-white p-2 w-full">{props.text}</button>;
}
