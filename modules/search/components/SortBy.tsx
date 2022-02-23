import { connectSortBy } from 'react-instantsearch-dom';

// COMPONENTS
import { Select } from "../../../components";

// TYPES
import { useMemo } from 'react';

export const SortBy = connectSortBy(({ items, currentRefinement, refine }) => {
  const selectedText = useMemo(() => items.find(i => i.value === currentRefinement)?.label, [currentRefinement]);

  return (<Select 
    selectedValue={currentRefinement}
    selectedText={selectedText}
    onChange={refine}
    className="w-44"
  >
    {items.map(item => (
      <Select.Item key={item.value} value={item.value}>
        {item.label}
      </Select.Item>
    ))}
  </Select>);
});
