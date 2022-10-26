const authErrors = {
  AnAccountWithTheGivenPhoneNumberAlreadyExists: 'AN_ACCOUNT_WITH_THE_GIVEN_PHONE_NUMBER_ALREADY_EXISTS',
  CodeNotValid: 'CODE_IS_NOT_VALID',
};

const profileErrors = {
  UsernameAlreadyAcquired: 'USERNAME_ALREADY_ACQUIRED',
  AlreadyHaveProfile: 'ALREADY_HAVE_PROFILE',
  NoSuchProfile: 'NO_SUCH_PROFILE',
  CannotGetUser: 'CANNOT_GET_USER',
  NoProfilesAroundToDiscover: 'NO_PROFILES_AROUND_TO_DISCOVER',
  CannotBlockYourself: 'CANNOT_BLOCK_YOURSELF',
  ProfileIdsNotCorrect: 'PROFILE_IDS_NOT_CORRECT',
};

const adminErrors = {
  NewPasswordCannotBeTheSameOldOne: 'NEW_PASSWORD_CANNOT_BE_THE_SAME_OLD_PASSWORD',
  EmailNotCorrect: 'EMAIL_NOT_CORRECT',
  PasswordNotCorrect: 'PASSWORD_NOT_CORRECT',
  PasswordOrEmailNotCorrect: 'PASSWORD_OR_EMAIL_NOT_CORRECT',
  AdminAccountAlreadyExist: 'ADMIN_ACCOUNT_ALREADY_EXIST',
  EmailAlreadyExist: 'EMAIL_ALREADY_EXIST',
  AdminNotExist: 'ADMIN_NOT_EXIST',
  InvalidTokenSignature: 'INVALID_TOKEN_SIGNATURE',
  RepasswordIsNotTrue: 'REPASSWORD_IS_NOT_TRUE',
  BothFieldsCannotBeEmpty: 'BOTH_FIELDS_CANNOT_BE_EMPTY',
  SomethingWentWrong: 'SOMETHING_WENT_WRONG',
  BrandIdNotFound: 'NO_SUCH_BRAND_ID',
  ModelIdNotFound: 'NO_SUCH_MODEL_ID',
};

const meErrors = {
  UsernameAlreadyAcquired: 'USERNAME_ALREADY_ACQUIRED',
  NoSuchImage: 'NO_SUCH_IMAGE',
  LicensePlateAlreadyUpdated: 'LICENSE_PLATE_ALREADY_UPDATED',
  SomethingWentWrong: 'SOMETHING_WENT_WRONG',
};

const rolesGuardError = {
  TokenNotCorrect: 'TOKEN_NOT_CORRECT',
};

const connectionErrors = {
  NoSuchConnection: 'NO_SUCH_CONNECTION',
  CannotSendConnectionRequestToYourself: 'CANNOT_SEND_CONNECTION_REQUEST_TO_YOURSELF',
  ProfileNotFound: 'PROFILE_NOT_FOUND',
  ConnectionRequestAlreadyAvailable: 'CONNECTION_REQUEST_ALREADY_AVAILABLE',
  SomethingWentWrong: 'SOMETHING_WENT_WRONG',
};

const reportErrors = {
  ReportAlreadyExists: 'REPORT_ALREADY_EXISTS',
  YouCannotReportYourself: 'YOU_CAN_NOT_REPORT_YOURSELF',
};

const imageErrors = {
  NoSuchImage: 'NO_SUCH_IMAGE',
  AlreadyLiked: 'ALREADY_LIKED',
  NoSuchComment: 'NO_SUCH_COMMENT',
};

const licensePlateErrors = {
  NoSuchLicensePlate: 'NO_SUCH_LICENSE_PLATE',
};

const notificationErrors = {
  NoSuchNotification: 'NO_SUCH_NOTIFICATION',
};

const messageErrors = {
  CannotSendMessageAnymore: 'CANNOT_SEND_MESSAGE_ANYMORE',
  NoSuchConversation: 'NO_SUCH_CONVERSATION',
  NoSuchProfile: 'NO_SUCH_PROFILE',
  CannotSendToYourself: 'CANNOT_SEND_MESSAGE_REQUEST_TO_YOURSELF',
  NoSuchMessageRequest: 'NO_SUCH_MESSAGE_REQUEST',
  SomethingWentWrong: 'SOMETHING_WENT_WRONG',
};

export { profileErrors, meErrors, connectionErrors, reportErrors, imageErrors, authErrors, licensePlateErrors, adminErrors, rolesGuardError, notificationErrors, messageErrors };
