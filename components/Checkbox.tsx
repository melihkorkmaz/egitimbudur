import React from "react";
import * as CheckboxPrimitives from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import styles from './checkbox.module.scss';

type CheckboxProps = {
  name?: string;
  children: React.ReactNode;
  checked: boolean;
  onCheckedChange: (checked: CheckboxPrimitives.CheckedState) => void;
};

export const Checkbox = ({
  children,
  ...props
}: CheckboxProps) => {
  // return (
  //   <>
  //     <input
  //       id={id}
  //       name={name}
  //       className="checkbox-custom"
  //       type="checkbox"
  //       checked={checked}
  //       onChange={onChange}
  //     />
  //     <label htmlFor={id} className="checkbox-custom-label">
  //       {children}
  //     </label>
  //   </>
  // );

  return (
    <div className="flex gap-4">
      <CheckboxPrimitives.Root id={props.name} className={styles.checkbox} {...props}>
        <CheckboxPrimitives.Indicator className={styles.indicator}>
          <CheckIcon />
        </CheckboxPrimitives.Indicator>
      </CheckboxPrimitives.Root>
      <label htmlFor={props.name} className="checkbox-custom-label">
        {children}
      </label>
    </div>
  );
};
