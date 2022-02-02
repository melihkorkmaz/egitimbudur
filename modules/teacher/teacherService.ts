import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, updateDoc } from "firebase/firestore";

// SERVICES
import { getUserProfile } from "../auth/authService";
import { getComments } from "../common/commentService";
import { getServices } from "../common/commonService";

// HELPERS
import { getBasePrice } from "./utils";

// TYPES
import type { Teacher, TeacherDTO, TeacherService, TeacherServiceDTO } from "./types";
import { getAuth } from "firebase/auth";

export const getTeacherServices = async (userId: string): Promise<TeacherService[]> => {
  const db = getFirestore();
  const serviceRef = collection(db, "users", userId, "services");
  const serviceTypes = await getServices();
  const q = query(serviceRef);
  const res = await getDocs(q);
  
  if (res.docs.length === 0) {
    return [];
  }

  return res.docs.map(doc => ({
    id: doc.id,
    duration: doc.data().duration,
    price: doc.data().price,
    service: serviceTypes.find(s => s.id === doc.data().typeId),
  }) as TeacherService);
};

export const getTeacher = async (id: string): Promise<Teacher | null> => {
  const [teacher, services, comments] = await Promise.all([
    getUserProfile<TeacherDTO>(id),
    getTeacherServices(id),
    getComments(id),
  ]);

  if (!teacher) {
    return null;
  }

  return {
    ...teacher,
    services: services,
    availableServiceTypes: services.map(s => s.service),
    basePrice: getBasePrice(services),
    comments,
  } as Teacher;
};

export const addService = async (userId: string, request: TeacherServiceDTO) => {
  const db = getFirestore();

  await addDoc(collection(db, "users", userId, "services"), request);
};

export const updateService = async (userId: string, data: TeacherServiceDTO) => {
  const db = getFirestore();
  await setDoc(doc(db, "users", userId, "services", data.id), data);
};

export const deleteService = async (userId: string, id: string) => {
  const db = getFirestore();
  await deleteDoc(doc(db, "users", userId, "services", id));
};

export const updateUserProfile = async (user: Teacher) => {
  try {
    const auth = getAuth();
    const authenticatedUser = auth.currentUser;

    if (!authenticatedUser) {
      throw new Error('User is not authenticated');
    }

    const db = getFirestore();
    const ref = doc(db, "users", authenticatedUser.uid);
    
    await updateDoc(ref, {
      firstName: user.firstName,
      lastName: user.lastName,
      description: user.description,
      about: user.about,
      grades: user.grades,
      lessons: user.lessons,
    });
  } catch (error) {
    console.log("error", error);
  }
};