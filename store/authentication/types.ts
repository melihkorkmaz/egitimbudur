export enum AuthCurrentState {
  NOT_INITIALIZED = 'NOT_INITIALIZED',
  NOT_AUTHENTICATED = 'NOT_AUTHENTICATED',
  AUTHENTICATED = 'AUTHENTICATED',
  FAILED = 'FAILED',
}

export enum AuthRole {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT'
}

export type AuthenticationState = {
  authState: AuthCurrentState;
  loginError?: string;
  userId?: string;
  token?: string;
  authRole?: AuthRole;
};