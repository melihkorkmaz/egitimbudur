import cx from 'classnames';
import styles from './select.module.scss';
import { Listbox } from '@headlessui/react'
import { SelectorIcon } from '@heroicons/react/outline';

type SelectItemProps = {
  children: string;
  value: string | number;
  key: string | number;
}

type SelectProps = {
  className?: string;
  block?: boolean,
  placeHolder?: string,
  selectedValue?: string,
  selectedText?: string,
  onChange: (value) => void;
  children: React.ReactNode;
};

const SelectItem = ({ value, children }: SelectItemProps) => (
  <Listbox.Option
    value={value}
    className={({ active }) =>
      cx(styles.option, {
        [styles.optionActive]: active
      })
    }
  >
    {children}
  </Listbox.Option>
);

export const Select = ({
  className,
  block,
  placeHolder,
  selectedValue,
  selectedText,
  onChange,
  children
}: SelectProps) => {
  return (
    <div className={cx(styles.selectBox, { 'w-full': block }, className)}>
      <Listbox value={selectedValue} onChange={onChange}>
        <div className="relative mt-1">
          <Listbox.Button className={styles.selectButton}>
            <span className="block truncate">{selectedText || placeHolder}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Listbox.Options className={styles.selectOptions}>
            {children}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}

Select.Item = SelectItem;