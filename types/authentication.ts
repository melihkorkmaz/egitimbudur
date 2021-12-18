export enum AuthRole {
  TEACHER = 'teacher',
  STUDENT = 'student'
}

export enum AuthCurrentState {
  NOT_INITIALIZED = 'NOT_INITIALIZED',
  NOT_AUTHENTICATED = 'NOT_AUTHENTICATED',
  AUTHENTICATED = 'AUTHENTICATED',
  FAILED = 'FAILED',
}
