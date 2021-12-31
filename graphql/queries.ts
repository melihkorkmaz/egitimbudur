import { gql } from "@apollo/client";

export const GRADES_QUERY = gql`
  query Grades {
    grades(sort: "Order:ASC") {
      data {
        id,
        attributes {
          Name,
          Order
        }
      }
    }
  }
`;

export const LESSONS_QUERY = gql`
  query Lessons {
    lessons(sort: "Order:ASC") {
      data {
        id,
        attributes {
          Name,
          Order
        }
      }
    }
  }
`;

export const ME = gql`
  query me{
    me {
      id,
      role {
        type
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser ($id: ID!){
    usersPermissionsUser(id: $id) {
      data {
        id,
        attributes {
          firstName
          lastName
          email
          description
          about
          zoomLink
          skypeUserName
          grades {
            data {
              id
            }
          }
          lessons {
            data {
              id
            }
          }
          photo {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const TEACHER_SERVICE_TYPES_QUERY = gql`
  query TeacherServiceTypes {
    teacherServiceTypes(sort: "order:ASC")  {
      data{
        id
        attributes {
          name,
          order
        }
      }
    }
  }
`;

export const TEACHER_SERVICES = gql`
  query TeacherServices($id: ID!) {
    teacherServices(filters: {
      users_permissions_user: {
        id: {
          eq: $id
        }
      }
    }) {
      data {
        id,
        attributes {
          duration
          price
          teacher_service_type {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;