import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query
} from "firebase/firestore";

// TYPES
import type { Lesson } from "../modules/common/types";

export const getLessons = async (): Promise<Lesson[]> => {
  const db = getFirestore();
  const lessonsRef = collection(db, "lessons");
  const q = query(lessonsRef, orderBy('order', 'asc'));
  const res = await getDocs(q);

  return res.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name,
  }) as Lesson);
};