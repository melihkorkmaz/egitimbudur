import users from '../dummyData/users.json';
import { AuthRole } from '../types/authentication';
import { TeacherType } from '../types/user';
export const getTeacher = (id: string): Promise<TeacherType | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const teacher =users.find(u => u.id === id && u.role === AuthRole.TEACHER);
      resolve(teacher as (TeacherType | undefined));
    }, 200);
  });
}