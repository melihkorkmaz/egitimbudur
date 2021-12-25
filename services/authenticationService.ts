import client from '../graphql/apollo-client';
import { LOGIN_MUTATION, REGISTER_MUTATION } from '../graphql/mutations';
import { ME } from '../graphql/queries';
import { AuthRole } from '../types/authentication';
import { GradeType, LessonType } from '../types/common';

export type AuthType = {
  jwt: string;
  user: {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    role: AuthRole;
  }
};

export type AuthErrorType = {
  message: string;
}

const getMe = async () => {
  const { data: { me } } = await client.query({
    query: ME,
  });
  
  return me;
}

export const loginByEmailAndPassword = async (email: string, password: string): Promise<AuthType | AuthErrorType> => {
 try {
   const { data: { login }} = await client.mutate({
    mutation: LOGIN_MUTATION,
    variables: {
      email,
      password,
    }
   });

   localStorage.setItem('token', login.jwt);

   const user = await getMe();

   return {
    jwt: login.jwt,
    user: {
      ...user,
      role: user.role.type === 'teacher' ? AuthRole.TEACHER : AuthRole.STUDENT
    }
   } as AuthType;

 } catch (error) {
  return {
    message: (error as Error).message
  }
 }
}

export type SignUpRequest = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  role: AuthRole,
  grade?: GradeType,
  lessons?: LessonType[]
  grades?: GradeType[]
};

export const signUpByEmailAndPassword = async (request: SignUpRequest): Promise<AuthType | AuthErrorType> => {
  try {
    const variables = {
      email: request.email,
      password: request.password,
      firstName: request.firstName,
      lastName: request.lastName,
      roleName: request.role.toString().toLowerCase(),
      grade: request.grade?.id,
      grades: request.grades?.map(grade => grade.id),
      lessons: request.lessons?.map(lesson => lesson.id)
    };

    const { data: {
      customRegister
    } } = await client.mutate({
      mutation: REGISTER_MUTATION,
      variables
    });


    return customRegister as AuthType;
  } catch (error) {
    return {
      message: (error as Error).message
    }
  }

}

export const resetPassword = (email: string): Promise<boolean | AuthErrorType> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "Bu email adresi sistemde kayitli degil"
      });
    }, 200);
  });
}