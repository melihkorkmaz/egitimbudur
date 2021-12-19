import cx from 'classnames';
import styles from './input.module.scss';

type InputProps = {
  type?: "text" | "password" | "email" | "number",
  className?: string,
  placeHolder?: string,
  block?: boolean,
  value?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}
export const Input = ({
  type = "text",
  className,
  placeHolder,
  block,
  onChange,
  value
}: InputProps) => {

  return (
    <input
      type={type}
      className={cx(styles.inp, {
        'w-full': block
      }, className)}
      onChange={onChange}
      value={value}
      placeholder={placeHolder}
    />
  );
}