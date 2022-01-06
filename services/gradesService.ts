import { collection, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import { GradeType } from "../types/common";

export const getGrades = async (): Promise<GradeType[]> => {
  const db = getFirestore();
  const gradesRef = collection(db, "grades");
  const q = query(gradesRef, orderBy('order', 'asc'));
  const res = await getDocs(q);

  return res.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }) as GradeType);
};