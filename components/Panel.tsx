import cx from 'classnames';

type PanelProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  zeroPadding?: boolean;
};

export const Panel = ({
  children,
  className,
  zeroPadding = false,
  onClick
}: PanelProps) => {

  return (
    <div className={cx('bg-white  rounded-lg', {
      'p-3': !zeroPadding
    }, className)} onClick={onClick}>
      {children}
    </div>
  );
};