export type SignUpInputData = {
    name: string,
    email: string,
    password: string,
}

export type LoginInputData = {
    email: string,
    password: string,
}

export type SignUpResponse = {
    status: number,
    message: string,
}

export type LoginResponse = {
    status: number,
    message: string,
}

export type LogoutResponse = {
    status: number,
    message: string,
}

export type UserData = {
    userId: string,
    name: string,
    email: string,
}

export type UserProfileResponse = {
    status: number,
    message: string,
    user?: UserData,
}