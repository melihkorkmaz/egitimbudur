import client from "../graphql/apollo-client";
import { TEACHER_SERVICE_TYPES_QUERY } from "../graphql/queries";
import { TeacherServiceType } from "../types/common";



export const getTeacherServiceTypes = async (): Promise<TeacherServiceType[]> => {
  const { data } = await client.query({
    query: TEACHER_SERVICE_TYPES_QUERY
  });

  return data.teacherServiceTypes.data.map(g => ({
    id: g.id,
    name: g.attributes.name,
    order: g.attributes.order
  }));
};