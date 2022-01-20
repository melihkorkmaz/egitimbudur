import { Stats, connectSortBy } from 'react-instantsearch-dom';

// COMPONENTS
import { Select } from "../../../components";

// TYPES
import type { SelectItem } from '../../../components';

export const SortBy = connectSortBy(({ items, currentRefinement, refine }) => {
  const options = items.map(item => ({
    key: item.label,
    value: item.value
  } as SelectItem));

  const handeChange = (item: SelectItem) => {
    refine(item.value);
  };

  return (<Select 
    options={options}
    selected={currentRefinement || ''}
    onChange={handeChange}
  />);
});
