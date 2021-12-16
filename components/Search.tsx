import { useState } from "react";
import { ClassType, LessonType } from "../store/search/types";
import { useSearchStore } from "../store/search/useSearchStore";
import { Button } from "./Button";
import { Select, SelectItem } from "./Select";

type SearchProps = {
  classes: ClassType[];
  lessons: LessonType[];
};

export const Search = ({
  classes = [],
  lessons = []
}: SearchProps) => {
  const [selectedClass, setSelectedClass] = useState<SelectItem | undefined>();
  const [selectedLesson, setSelectedLesson] = useState<SelectItem | undefined>();

  return (
    <div className="flex">
      <Select
        options={
          classes
            ? classes.map((c) => ({
                value: c.id,
                key: c.name,
              }))
            : []
        }
        selected={selectedClass}
        onChange={setSelectedClass}
        placeHolder="Sınıf Seçiniz..."
        block
        className="mr-2"
      />
      <Select
        options={
          lessons
            ? lessons.map((l) => ({
                value: l.id,
                key: l.name,
              }))
            : []
        }
        selected={selectedLesson}
        onChange={setSelectedLesson}
        placeHolder="Ders Seçiniz..."
        block
        className="mr-2"
      />
      <Button primary>Ara</Button>
    </div>
  );
};
