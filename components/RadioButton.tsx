import React from "react";
import cx from 'classnames';

type RadioButtonProps = {
  children: React.ReactNode;
  id: string;
  group: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
};
export const RadioButton = ({
  children,
  id,
  group,
  checked,
  value,
  className,
  onChange,
}: RadioButtonProps) => {
  return (
    <div className={cx('inline-block', className)}>
      <input
        id={id}
        value={value}
        className="radio-custom"
        name={group}
        type="radio"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="radio-custom-label">
        {children}
      </label>
    </div>
  );
};
