import cx from 'classnames';
import styles from './input.module.scss';

type InputProps = {
  type?: "text" | "password" | "email" | "number",
  id?: string,
  className?: string,
  placeHolder?: string,
  block?: boolean,
  value?: string | number,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}
export const Input = ({
  id,
  type = "text",
  className,
  placeHolder,
  block,
  onChange,
  value
}: InputProps) => {

  return (
    <input
      id={id}
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