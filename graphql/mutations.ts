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
          lastName
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

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email){
      ok
    }
  }
`;

export const PASSWORD_RESET_MUTATION = gql`
  mutation ResetPassword($password: String!, $code: String!) {
    resetPassword(
      password: $password
      passwordConfirmation: $password
      code: $code
    ){
      jwt
    }
  }
`;