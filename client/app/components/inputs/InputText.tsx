import React, { ChangeEventHandler } from "react";

export default function InputText(props: {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  data: any;
  name: string;
  label: string;
}) {
  const { handleChange, data, name, label } = props;
  return (
    <div className="grid">
      <label htmlFor={name}>{label}</label>
      <input
        className="rounded shadow border px-1"
        onChange={handleChange}
        value={data[name]}
        name={name}
        type="text"
      />
    </div>
  );
}
