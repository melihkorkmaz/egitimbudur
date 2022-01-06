import { collection, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import { TeacherServiceType } from "../types/common";


export const getServiceTypes = async (): Promise<TeacherServiceType[]> => {
  const db = getFirestore();
  const gradesRef = collection(db, "serviceTypes");
  const q = query(gradesRef, orderBy('order', 'asc'));
  const res = await getDocs(q);

  return res.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }) as TeacherServiceType);
};