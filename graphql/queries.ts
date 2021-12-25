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
  query {
    me {
      id,
      email,
      firstName,
      lastName,
      role {
        type
      }
    }
  }
`;