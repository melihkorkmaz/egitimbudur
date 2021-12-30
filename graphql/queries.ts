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