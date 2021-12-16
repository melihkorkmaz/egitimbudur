import cx from 'classnames';
import styles from './select.module.scss';

export type SelectItem = {
  key: string;
  value: string;
}

type SelectProps = {
  className?: string;
  block?: boolean,
  placeHolder?: string,
  options: SelectItem[],
  selected?: SelectItem,
  onChange: (item: SelectItem) => void;
};

export const Select = ({
  className,
  block,
  placeHolder,
  options,
  selected,
  onChange
}: SelectProps) => {

  return (
    <div className={cx(styles.selectBox, {
      'w-full': block
    }, className)}>
      <select value={selected?.value || ""} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        onChange(options.find(o => o.value === value) || options[0]);
      }}>
        {placeHolder && <option value="" disabled>{placeHolder}</option>}
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.key}</option>
        ))}
      </select>
    </div>
  );
}