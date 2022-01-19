import { connectSearchBox } from 'react-instantsearch-dom';
import { Input } from "../Input";

type SearchInputProps = {
  currentRefinement?: string;
  placeHolder?: string;
  refine: (string) => void;
}
export const SearchInput = connectSearchBox(({ currentRefinement, refine, placeHolder }: SearchInputProps) => (
  <div>
    <Input
      placeHolder={placeHolder}
      value={currentRefinement}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => refine(e.target.value)}
      block
    />
  </div>
));
