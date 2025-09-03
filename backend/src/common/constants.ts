export enum ResponseStatus {
    SUCCESS = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
}

export enum ResponseMessage {
    USER_REGISTER_SUCCESS = 'User registered successfully',
    USER_LOGIN_SUCCESS = 'User logged successfully',
    USER_FETCH_SUCCESS = 'User profile fetched successfully',
    USER_IS_NOT_FOUND = 'User is not found',
    PASSWORD_IS_INCORRECT = 'Password is incorrect',
    UNAUTHORIZED = 'Unauthorized',
    INVALID_CREDENTIALS = 'Invalid credentials',
    VALIDATION_FAILED = 'Validation failed',
}

export enum APIEndpoint {
    USER_REGISTER = 'register',
    USER_LOGIN = 'login',
    GET_PROFILE = 'profile',
}
