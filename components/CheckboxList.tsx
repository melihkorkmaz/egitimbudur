// Components
import { Checkbox } from "./";

//Types
import type { CheckedState } from './';

type ChecboxListItem = {
  key: string;
  value: string;
};

type CheckboxListProps = {
  name?: string;
  items: ChecboxListItem[];
  selectedItems: string[];
  onUpdate: (key: string[]) => void;
}

export const CheckboxList = ({
  items,
  selectedItems,
  onUpdate
}: CheckboxListProps) => {
  return (
    <ul className="no-ul-list mb-3">
      {items.map((item) => (
        <li key={item.key}>
          <Checkbox 
            name={item.key}
            checked={selectedItems.some(s => s === item.key)}
            onCheckedChange={(e: CheckedState) => {
              console.log("e.valueOf()", e.valueOf())
              if (e.valueOf()) {
                onUpdate([...selectedItems, item.key]);
              } else {
                onUpdate(selectedItems.filter(l => l !== item.key));
              }
            }}
          >
              {item.value}
          </Checkbox>
        </li>
      ))}
    </ul>
  );
};
