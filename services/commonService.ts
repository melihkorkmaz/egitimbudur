import { 
  collection, 
  getDocs, 
  getFirestore, 
  orderBy, 
  query 
} from "firebase/firestore";

// TYPES & ENUMS
import { ServiceType } from "../modules/teacher/enums";
import type { Service } from "../modules/teacher/types";

export const getServices = async (): Promise<Service[]> => {
  const db = getFirestore();
  const servicesRef = collection(db, "serviceTypes");
  const q = query(servicesRef, orderBy('order', 'asc'));
  const res = await getDocs(q);

  return res.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name,
    type: doc.data().typeName as ServiceType,
  }) as Service);
};