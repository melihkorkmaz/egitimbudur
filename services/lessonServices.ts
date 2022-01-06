import { collection, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import { LessonType } from "../types/common";

export const getLessons = async (): Promise<LessonType[]> => {
  const db = getFirestore();
  const lessonsRef = collection(db, "lessons");
  const q = query(lessonsRef, orderBy('order', 'asc'));
  const res = await getDocs(q);

  return res.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }) as LessonType);
};