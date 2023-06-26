import React, { ChangeEventHandler } from "react";

export default function EmailInput(props: {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  data: any;
}) {
  const { handleChange, data } = props;
  return (
    <>
      <label htmlFor="email">Correo electr&oacute;nico</label>
      <input
        id="email"
        className="rounded shadow border px-1"
        onChange={handleChange}
        value={data.email}
        name="email"
        type="email"
      />
    </>
  );
}
