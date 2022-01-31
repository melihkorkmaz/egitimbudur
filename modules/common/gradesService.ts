import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query
} from "firebase/firestore";

// TYPES & ENUMS
import type { Grade } from "./types";

export const getGrades = async (): Promise<Grade[]> => {
  const db = getFirestore();
  const gradesRef = collection(db, "grades");
  const q = query(gradesRef, orderBy('order', 'asc'));
  const res = await getDocs(q);

  return res.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }) as Grade);
};