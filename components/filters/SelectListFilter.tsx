import React from 'react';
import { connectMenu } from 'react-instantsearch-dom';
import { Select } from "../Select";

type CustomMenuSelectItem = {
  name: string,
  id: string,
};

type SelectListFilterProps = {
  placeHolder?: string;
  refine: (string) => void;
  defaultRefinement?: string;
  currentRefinement?: string;
  customItems: CustomMenuSelectItem[];
  attribute: string;
}

export const SelectListFilter = connectMenu(({ refine, currentRefinement = '', customItems, placeHolder }: SelectListFilterProps) => {
  return (
    <Select placeHolder={placeHolder} options={customItems.map(c => ({
      key: c.name,
      value: c.id
    }))} selected={currentRefinement || ''} onChange={(item) => {
      refine(item.value);
    }} block />
  );
});
