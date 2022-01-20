import { useState } from "react";
import { useRouter } from "next/router";

// COMPONENTS
import { Select, Button } from "../../../components";

// TYPES
import type { Grade, Lesson } from "../../common/types";
import type { SelectItem } from '../../../components';

type SearchProps = {
  grades: Grade[];
  lessons: Lesson[];
};

export const Search = ({
  grades = [],
  lessons = []
}: SearchProps) => {
  const router = useRouter();

  const [selectedGrade, setSelectedGrade] = useState<SelectItem>();
  const [selectedLesson, setSelectedLesson] = useState<SelectItem>();

  const gradeOptions = grades.map((c) => ({
    value: c.id,
    key: c.name,
  } as SelectItem));

  const lessonOptions = lessons.map((l) => ({
    value: l.id,
    key: l.name,
  } as SelectItem));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedGrade && !selectedLesson) {
      return;
    }

    router.push(`/teachers?g=${selectedGrade?.value}&l=${selectedLesson?.value}`);
  };


  return (
    <form onSubmit={handleSubmit} className="flex">
      <Select
        options={gradeOptions}
        selected={selectedGrade?.value}
        onChange={setSelectedGrade}
        placeHolder="Sınıf Seçiniz..."
        block
        className="mr-2"
      />
      <Select
        options={lessonOptions}
        selected={selectedLesson?.value}
        onChange={setSelectedLesson}
        placeHolder="Ders Seçiniz..."
        block
        className="mr-2"
      />
      <Button type='submit' primary>Ara</Button>
    </form>
  );
};
