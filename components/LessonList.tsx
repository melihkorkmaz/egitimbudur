import { LessonType } from "../store/search/types";
import { Checkbox } from "./Checkbox";

export type LessonListType = {
  lesson: LessonType;
  selected: boolean;
}

type LessonListProps = {
  items: LessonListType[];
  onUpdate: (items: LessonListType[]) => void;
}

export const LessonList = ({
  items,
  onUpdate
}: LessonListProps) => {
  return (
    <ul className="no-ul-list mb-3">
      {items.map((item) => (
        <li key={item.lesson.id}>
          <Checkbox 
            id={item.lesson.id} 
            checked={item.selected}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onUpdate([...items].map(i => {
                if (i === item) {
                  return ({
                    lesson: i.lesson,
                    selected: e.target.checked
                  })
                }

                return i
              }));
            }}
          >
              {item.lesson.name}
          </Checkbox>
        </li>
      ))}
    </ul>
  );
};
