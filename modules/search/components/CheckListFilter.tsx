import { connectRefinementList } from 'react-instantsearch-dom';
import { RefinementListProvided } from 'react-instantsearch-core';

// COMPONENTS
import { Checkbox } from "../../../components";

// TYPES
import type { CheckedState } from '../../../components';
type CheckListFilterItem = {
  name: string,
  id: string,
};

type CheckListFilterProps = RefinementListProvided & {
  customItems: CheckListFilterItem[];
};

export const CheckListFilter = connectRefinementList(({ customItems, refine, currentRefinement }: CheckListFilterProps) => {
  
  const handleChange = (e: CheckedState, item: CheckListFilterItem) => {
    e.valueOf() ? 
      refine([...currentRefinement, item.id]) :
      refine(currentRefinement.filter(id => id !== item.id));
  };

  return (<ul className="no-ul-list mb-3">
    {customItems.map((item) => (
      <li key={item.id}>
        <Checkbox
          name={`lesson-${item.id}`}
          checked={currentRefinement.includes(item.id)}
          onCheckedChange={(e) => handleChange(e, item)}
        >
          {item.name}
        </Checkbox>
      </li>
    ))}
  </ul>);
});