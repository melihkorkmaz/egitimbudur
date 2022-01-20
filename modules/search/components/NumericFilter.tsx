import { NumericMenuProvided, TranslatableExposed } from 'react-instantsearch-core';
import { connectNumericMenu } from 'react-instantsearch-dom';

// COMPONENTS
import { RadioButton } from '../../../components/RadioButton';

type NumericFilterProps = NumericMenuProvided & TranslatableExposed & {
  group: string;
}

export const NumericFilter = connectNumericMenu(({ items, currentRefinement, refine, group }: NumericFilterProps) => (<ul className="no-ul-list mb-3">
  {items.map((item) => (
    <li key={item.value} className="mb-1">
      <RadioButton
        id={item.label}
        group={group}
        value={item.value}
        checked={currentRefinement === item.value}
        onChange={() => {
          refine(item.value);
        }}
      >
        {item.label}
      </RadioButton>
    </li>
  ))}
</ul>));