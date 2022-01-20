import { connectMenu } from 'react-instantsearch-dom';
import { MenuProvided } from 'react-instantsearch-core';

// COMPONENTS
import { Select } from "../../../components";

// TYPES
import type { SelectItem } from '../../../components';
type CustomMenuSelectItem = {
  name: string,
  id: string,
};

type SelectListFilterProps = MenuProvided & {
  placeHolder?: string;
  customItems: CustomMenuSelectItem[];
};

export const SelectListFilter = connectMenu(({ refine, currentRefinement = '', customItems, placeHolder }: SelectListFilterProps) => {
  const options = customItems.map(c => ({
    key: c.name,
    value: c.id
  } as SelectItem));

  const handleChange = (item: SelectItem) => {
    refine(item.value);
  };

  return (
    <Select 
      placeHolder={placeHolder} 
      options={options} 
      selected={currentRefinement || ''} 
      onChange={handleChange} block />
  );
});
