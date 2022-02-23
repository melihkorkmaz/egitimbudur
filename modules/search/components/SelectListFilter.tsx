import { connectMenu } from 'react-instantsearch-dom';
import { MenuProvided } from 'react-instantsearch-core';

// COMPONENTS
import { Select } from "../../../components";
import { useMemo } from 'react';

// TYPES
type CustomMenuSelectItem = {
  name: string,
  id: string,
};

type SelectListFilterProps = MenuProvided & {
  placeHolder?: string;
  customItems: CustomMenuSelectItem[];
};

export const SelectListFilter = connectMenu(({ refine, currentRefinement = '', customItems, placeHolder }: SelectListFilterProps) => {
  const selectedText = useMemo(() => customItems.find(i => i.id === currentRefinement)?.name, [currentRefinement]);

  return (
    <Select 
      placeHolder={placeHolder} 
      selectedValue={currentRefinement}
      selectedText={selectedText}
      onChange={refine} block>
      {customItems.map(item => (
        <Select.Item key={item.id} value={item.id}>
          {item.name}
        </Select.Item>
      ))}
    </Select>
  );
});
