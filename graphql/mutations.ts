import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
    mutation CustomUsersPermissionsRegisterInput(
      $email: String!, 
      $password: String!,
      $firstName: String!,
      $lastName: String!,
      $roleName: String!,
      $grade: String,
      $grades: [String],
      $lessons: [String],
    ) {
      customRegister(input: { 
        email: $email, 
        password: $password,
        firstName: $firstName,
        lastName: $lastName,
        roleName: $roleName,
        grade: $grade,
        grades: $grades,
        lessons: $lessons
    }) {
        jwt,
        user {
          id
          email,
          firstName,
          lastName,
          role {
            type
          }
        }
      }
    }
`

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { identifier: $email, password: $password }) {
      jwt
    }
  }
`;

