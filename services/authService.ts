import { AuthErrorType } from "../types/authentication";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { CreateUserRequest, isCreateTeacherRequest } from "../types/user";

export const signUp = async (request: CreateUserRequest) : Promise<boolean | AuthErrorType> => {
  const auth = getAuth();
  const db = getFirestore();
  try {
    const { user: { uid } } = await createUserWithEmailAndPassword(auth, request.email, request.password);

    const userEntity = isCreateTeacherRequest(request) ? {
      role: request.role,
      firstName: request.firstName,
      lastName: request.lastName,
      grades: request.grades,
      lessons: request.lessons,
    } : {
      role: request.role,
      firstName: request.firstName,
      lastName: request.lastName,
      grade: request.grade,
    };
    await setDoc(doc(db, 'users', uid), userEntity);
    return true;
  } catch (error) {
    return {
      message: (error as Error).message,
    } as AuthErrorType;
  }
}

export const signIn = async(email: string, password: string): Promise<boolean | AuthErrorType> => {
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    return {
      message: (error as Error).message,
    } as AuthErrorType;
  }
}