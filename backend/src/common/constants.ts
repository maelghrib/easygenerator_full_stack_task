export enum ResponseStatus {
    SUCCESS = 200,
    CREATED = 201,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
}

export enum ResponseMessage {
    USER_REGISTER_SUCCESS = 'User registered successfully',
    USER_LOGIN_SUCCESS = 'User logged successfully',
    USER_IS_NOT_FOUND = 'User is not found',
    PASSWORD_IS_INCORRECT = 'Password is incorrect',
}
