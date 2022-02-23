import { useState } from "react";
import { useRouter } from "next/router";

// COMPONENTS
import { Select, Button } from "../../../components";

// TYPES
import type { Grade, Lesson } from "../../common/types";

type SearchProps = {
  grades: Grade[];
  lessons: Lesson[];
};

export const Search = ({
  grades = [],
  lessons = []
}: SearchProps) => {
  const router = useRouter();

  const [selectedGrade, setSelectedGrade] = useState<Grade>();
  const [selectedLesson, setSelectedLesson] = useState<Lesson>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedGrade && !selectedLesson) {
      return;
    }

    router.push(`/teachers?g=${selectedGrade?.id}&l=${selectedLesson?.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <Select
        selectedValue={selectedGrade?.id}
        selectedText={selectedGrade?.name}
        onChange={(value) => { setSelectedGrade(grades.find(g => g.id === value))}}
        placeHolder="Sınıf Seçiniz..."
        block
        className="mr-2"
      >
        {grades.map(g => (
          <Select.Item key={g.id} value={g.id}>
            {g.name}
          </Select.Item>
        ))}
      </Select>
      <Select
        selectedValue={selectedLesson?.id}
        selectedText={selectedLesson?.name}
        onChange={(value) => { setSelectedLesson(lessons.find(g => g.id === value))}}
        placeHolder="Ders Seçiniz..."
        block
        className="mr-2"
      >
        {lessons.map(l => (
          <Select.Item key={l.id} value={l.id}>
            {l.name}
          </Select.Item>
        ))}
      </Select>
      <Button type='submit' primary>Ara</Button>
    </form>
  );
};
