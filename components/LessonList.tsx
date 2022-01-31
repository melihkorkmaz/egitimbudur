import { Lesson } from "../modules/common/types";
import { Checkbox } from "./Checkbox";

export type LessonListType = {
  lesson: Lesson;
  selected: boolean;
}

type LessonListProps = {
  name?: string;
  items: LessonListType[];
  onUpdate: (items: LessonListType[]) => void;
}

export const LessonList = ({
  name,
  items,
  onUpdate
}: LessonListProps) => {
  return (
    <ul className="no-ul-list mb-3">
      {items.map((item) => (
        <li key={item.lesson.id}>
          <Checkbox 
            name={name}
            id={`lesson-${item.lesson.id}`}
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
