import { Checkbox } from "./Checkbox";

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
  name,
  items,
  selectedItems,
  onUpdate
}: CheckboxListProps) => {
  return (
    <ul className="no-ul-list mb-3">
      {items.map((item) => (
        <li key={item.key}>
          <Checkbox 
            name={name}
            id={item.key}
            checked={selectedItems.some(s => s === item.key)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.currentTarget.checked) {
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
