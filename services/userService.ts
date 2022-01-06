import {
  deleteDoc,
  DocumentData,
  DocumentReference,
  getFirestore,
  setDoc,
  Unsubscribe,
} from "@firebase/firestore";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc } from "firebase/firestore";
import { TeacherService } from "../types/common";
import { isTeacher, UserProfile } from "../types/user";

let userRef: DocumentReference<DocumentData>;

const getUserRef = (id: string) => {
  if (!userRef) {
    const db = getFirestore();
    userRef = doc(db, "users", id);
  }

  return userRef;
};

export const getUserProfileSub = async (
  id: string,
  onChange: (UserProfile) => void
): Promise<Unsubscribe | null> => {
  try {
    const docRef = getUserRef(id);

    const unsub = onSnapshot(docRef, (doc) => {
      const user = doc.data();

      console.log("USER CHANGED");
      onChange({
        ...user,
        id,
      } as UserProfile);
    });

    await getDoc(docRef);

    return unsub;
  } catch (error) {
    //log error
    return null;
  }
};

export const updateUserProfile = async (user: UserProfile) => {
  try {
    const ref = getUserRef(user.id);
    const userEntity = isTeacher(user)
      ? {
          firstName: user.firstName,
          lastName: user.lastName,
          description: user.description,
          about: user.about,
          grades: user.grades,
          lessons: user.lessons,
        }
      : {
          firstName: user.firstName,
          lastName: user.lastName,
          grade: user.grade,
        };

    await updateDoc(ref, userEntity);
  } catch (error) {
    console.log("error", error);
  }
};

export const updateUserPhoto = async (userId: string, url: string) => {
  try {
    const ref = getUserRef(userId);
    await updateDoc(ref, { photo: url });
  } catch (error) {
    // TODO: log error
  }
};

export const addService = async (userId: string, request: TeacherService) => {
  const db = getFirestore();

  await addDoc(collection(db, "users", userId, "services"), request);
};

export const getUserServices = async (userId: string) => {
  const db = getFirestore();
  const serviceRef = collection(db, "users", userId, "services");
  const q = query(serviceRef);
  const res = await getDocs(q);

  return res.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }) as TeacherService);
};

export const updateService = async (userId: string, data: TeacherService) => {
  const db = getFirestore();
  await setDoc(doc(db, "users", userId, "services", data.id), {
    duration: data.duration,
    price: data.price,
    serviceType: data.serviceType
  });
};

export const deleteService = async (userId: string, id: string) => {
  const db = getFirestore();
  await deleteDoc(doc(db, "users", userId, "services", id));
};