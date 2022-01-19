import { connectRefinementList } from 'react-instantsearch-dom';
import { Checkbox } from "../Checkbox";

type CheckListFilterItem = {
  name: string,
  id: string,
};

type CheckListFilterProps = {
  customItems: CheckListFilterItem[];
  refine: (string) => void;
  defaultRefinement?: string;
  currentRefinement: string[];
  attribute: string;
}

export const CheckListFilter = connectRefinementList(({ customItems, refine, currentRefinement }: CheckListFilterProps) => {
  return (<ul className="no-ul-list mb-3">
    {customItems.map((item) => (
      <li key={item.id}>
        <Checkbox
          id={`lesson-${item.id}`}
          checked={currentRefinement.includes(item.id)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.checked) {
              refine([...currentRefinement, item.id]);
            } else {
              refine(currentRefinement.filter(i => i !== item.id));
            }
          }}
        >
          {item.name}
        </Checkbox>
      </li>
    ))}
  </ul>)
});