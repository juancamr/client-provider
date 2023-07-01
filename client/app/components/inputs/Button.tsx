import React from "react";

export default function Button(props: { text: string }) {
  return <button className="bg-indigo-700 mb-3 hover:bg-indigo-800 rounded shadow mt-5 text-white p-2">{props.text}</button>;
}
