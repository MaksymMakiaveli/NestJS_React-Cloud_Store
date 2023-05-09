// export const ErrorMessages = {
//   accessDenied: 'Access Denied',
//   userNotFound: 'User Not Found',
//   incorrectAuthData: 'The password or email is incorrect',
//   emailDoesNotExist
// } as const;
export enum ErrorType {
  ACCESS_DENIED,

  USER_NOT_FOUND,

  INCORRECT_AUTH_DATA,

  EMAIL_DOES_NOT_EXIST,
}
