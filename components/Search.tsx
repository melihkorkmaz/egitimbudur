import { useState } from "react";
import { useRouter } from "next/router";
import { GradeType, LessonType } from "../types/common";
import { Button } from "./Button";
import { Select } from "./Select";

type SearchProps = {
  classes: GradeType[];
  lessons: LessonType[];
};

export const Search = ({
  classes = [],
  lessons = []
}: SearchProps) => {
  const router = useRouter();
  const [selectedGrade, setSelectedGrade] = useState<string | undefined>();
  const [selectedLesson, setSelectedLesson] = useState<string | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGrade && !selectedLesson) {
      return;
    }

    router.push(`/teachers?g=${selectedGrade}&l=${selectedLesson}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <Select
        options={
          classes
            ? classes.map((c) => ({
                value: c.id,
                key: c.name,
              }))
            : []
        }
        selected={selectedGrade}
        onChange={(item) => setSelectedGrade(item.value)}
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
        onChange={(item) => setSelectedLesson(item.value)}
        placeHolder="Ders Seçiniz..."
        block
        className="mr-2"
      />
      <Button type='submit' primary>Ara</Button>
    </form>
  );
};
