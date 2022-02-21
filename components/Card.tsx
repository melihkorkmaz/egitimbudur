import cx from 'classnames';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  zeroPadding?: boolean;
};

export const Card = ({
  children,
  className,
  zeroPadding = false,
  onClick
}: CardProps) => {

  return (
    <div className={cx('bg-white  rounded-lg', {
      'p-3': !zeroPadding
    }, className)} onClick={onClick}>
      {children}
    </div>
  );
};