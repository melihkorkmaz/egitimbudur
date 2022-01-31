import cx from 'classnames';
import styles from './input.module.scss';

type InputProps = {
  type?: "text" | "password" | "email" | "number",
  id?: string,
  name?: string,
  className?: string,
  placeHolder?: string,
  block?: boolean,
  value?: string | number,
  required?: boolean,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}
export const Input = ({
  id,
  name,
  type = "text",
  className,
  placeHolder,
  block,
  onChange,
  value,
  required = false
}: InputProps) => {

  return (
    <input
      id={id}
      name={name}
      type={type}
      className={cx(styles.inp, {
        'w-full': block
      }, className)}
      onChange={onChange}
      value={value}
      placeholder={placeHolder}
      required={required}
    />
  );
}