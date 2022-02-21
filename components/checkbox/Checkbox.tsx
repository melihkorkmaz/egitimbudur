import React from "react";
import cx from 'classnames';
import { CheckIcon } from '@radix-ui/react-icons';

// Components
import * as CheckboxPrimitives from '@radix-ui/react-checkbox';
import { Label } from "..";

import styles from './checkbox.module.scss';

export type CheckedState = CheckboxPrimitives.CheckedState;

type CheckboxProps = {
  name?: string;
  children: React.ReactNode;
  checked: boolean;
  onCheckedChange: (checked: CheckboxPrimitives.CheckedState) => void;
  className?: string;
};

export const Checkbox = ({
  children,
  className,
  ...props
}: CheckboxProps) => {
  return (
    <div className="flex gap-3 items-center">
      <CheckboxPrimitives.Root id={props.name} className={cx(styles.checkbox, className)} {...props}>
        <CheckboxPrimitives.Indicator className={styles.indicator}>
          <CheckIcon />
        </CheckboxPrimitives.Indicator>
      </CheckboxPrimitives.Root>
      <Label htmlFor={props.name} className="checkbox-custom-label">
        {children}
      </Label>
    </div>
  );
};
