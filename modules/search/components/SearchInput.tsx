import { connectSearchBox } from 'react-instantsearch-dom';
import { SearchBoxProvided } from 'react-instantsearch-core';

// COMPONENTS
import { Input } from "../../../components";

type SearchInputProps = SearchBoxProvided & {
  placeHolder: string;
};

export const SearchInput = connectSearchBox(({ currentRefinement, refine, placeHolder }: SearchInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    refine(e.target.value);
  };

  return (
    <div>
      <Input
        placeHolder={placeHolder}
        value={currentRefinement}
        onChange={handleChange}
        block
      />
    </div>
  );
});
