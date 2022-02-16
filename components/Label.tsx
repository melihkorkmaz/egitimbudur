
import { ReactNode } from 'react';

// Components
import * as LabelPrimitive from '@radix-ui/react-label';

type LabelProps = {
  children: ReactNode,
  className?: string,
  htmlFor?: string,
};

export const Label = ({ children, ...props }: LabelProps) => (
  <LabelPrimitive.Root {...props}>
    {children }
  </LabelPrimitive.Root>
);