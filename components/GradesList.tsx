import { GradeType } from "../types/common";
import { Checkbox } from "./Checkbox";

export type GradesListType = {
  grade: GradeType;
  selected: boolean;
}

type GradesListProps = {
  items: GradesListType[];
  onUpdate: (items: GradesListType[]) => void;
}

export const GradesList = ({
  items,
  onUpdate
}: GradesListProps) => {
  return (
    <ul className="no-ul-list mb-3">
      {items.map((item) => (
        <li key={item.grade.id}>
          <Checkbox 
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
