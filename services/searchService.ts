import { SearchFilterType, TeacherServiceCategoryType } from '../types/common';
import { Teacher } from '../types/user';
import users from '../dummyData/users.json';
import { AuthRole } from '../types/authentication';
import serviceDummyData from '../dummyData/serviceType.json';
import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore';

export const getServices = async (): Promise<TeacherServiceCategoryType[]> => {
  const db = getFirestore();
  const servicesRef = collection(db, "serviceTypes");
  const q = query(servicesRef, orderBy('order', 'asc'));
  const res = await getDocs(q);

  return res.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }) as TeacherServiceCategoryType);
};

export const searchTeachers = async (filter?: SearchFilterType): Promise<Teacher[]> => {
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     const teachers = (users as UserType[]).filter(user => user.role === AuthRole.TEACHER) as TeacherType[];
  //     resolve(teachers);
  //   }, 200);
  // })

  const db = getFirestore();
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("role", "==", "teacher"));
  const res = await getDocs(q);

  return res.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }) as Teacher);
};