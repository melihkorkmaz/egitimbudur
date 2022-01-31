import { Grade } from "../modules/common/types";
import { Checkbox } from "./Checkbox";

export type GradesListType = {
  grade: Grade;
  selected: boolean;
}

type GradesListProps = {
  name?: string;
  items: GradesListType[];
  onUpdate: (items: GradesListType[]) => void;
}

export const GradesList = ({
  name,
  items,
  onUpdate
}: GradesListProps) => {
  return (
    <ul className="no-ul-list mb-3">
      {items.map((item) => (
        <li key={item.grade.id}>
          <Checkbox 
            name={name}
            id={`grade-${item.grade.id}`}
            checked={item.selected}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onUpdate([...items].map(i => {
                if (i === item) {
                  return ({
                    grade: i.grade,
                    selected: e.target.checked
                  })
                }

                return i
              }));
            }}
          >
              {item.grade.name}
          </Checkbox>
        </li>
      ))}
    </ul>
  );
};
