import { doc, getDoc, getFirestore, onSnapshot, setDoc, Unsubscribe, updateDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// Helpers
import { isCreateTeacherRequest } from "./types";

// Types
import type { AuthErrorType, CreateUserRequest, UserProfile } from "./types";

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
};

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
};

export const getUserProfile = async <T>(id: string): Promise<T | null> => {
  try {
    const db = getFirestore();
    const docRef = doc(db, "users", id);
    const user = await getDoc(docRef);

    if (user.exists()) {
      return {
        ...user.data(),
        id,
      } as unknown as T;
    }

    return null;
  } catch (error) {
    // TODO: Log error
    return null;
  }
};

export const updateUserPhoto = async (userId: string, url: string) => {
  try {
    const db = getFirestore();
    const ref = doc(db, "users", userId);
    await updateDoc(ref, { photo: url });
  } catch (error) {
    // TODO: log error
  }
};

export const getUserProfileSub = async (
  id: string,
  onChange: (UserProfile) => void
): Promise<Unsubscribe | null> => {
  try {
    const db = getFirestore();
    const docRef = doc(db, "users", id);

    const unsub = onSnapshot(docRef, (doc) => {
      const user = doc.data();
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