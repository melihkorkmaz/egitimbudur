import React from "react";

type CheckboxProps = {
  id: string;
  name?: string;
  children: React.ReactNode;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({
  id,
  name,
  children,
  checked,
  onChange
}: CheckboxProps) => {
  return (
    <>
      <input
        id={id}
        name={name}
        className="checkbox-custom"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="checkbox-custom-label">
        {children}
      </label>
    </>
  );
};
