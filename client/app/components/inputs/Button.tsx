import React from "react";

export default function Button(props: { text: string; onClick?: Function }) {
  const { text, onClick } = props;
  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      className="bg-indigo-700 hover:bg-indigo-800 rounded shadow text-white p-2 w-full"
    >
      {text}
    </button>
  );
}
