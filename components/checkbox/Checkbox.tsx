import React from "react";
import * as CheckboxPrimitives from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import styles from './checkbox.module.scss';
import { Label } from "..";

export type CheckedState = CheckboxPrimitives.CheckedState;

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
  return (
    <div className="flex gap-4">
      <CheckboxPrimitives.Root id={props.name} className={styles.checkbox} {...props}>
        <CheckboxPrimitives.Indicator className={styles.indicator}>
          <CheckIcon />
        </CheckboxPrimitives.Indicator>
      </CheckboxPrimitives.Root>
      <Label htmlFor={props.name} className="checkbox-custom-labe'">
        {children}
      </Label>
    </div>
  );
};
