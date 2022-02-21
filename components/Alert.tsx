import cx from 'classnames';
import { ReactNode } from 'react';

type AlertProps = {
  children: ReactNode;
  type?: 'warning';
  className?: string;
}

export const Alert = ({
  children,
  type = 'warning',
  className,
}: AlertProps) => {

  const alertClass = cx('px-2 py-1 border border-solid rounded', {
    ['bg-amber-50 text-amber-600 border-amber-600']: type === 'warning'
  }, className);

  return (
    <div className={alertClass} >
      {children}
    </div>
  );
};