import {IsNotEmpty, IsString} from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class LoginUserDto {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class UserRegisterResponseDto {
    status: number;
    message: string;
    user?: {
        userId: string;
        name: string;
        email: string;
    }
}

export class UserLoginResponseDto {
    status: number;
    message: string;
    user?: {
        userId: string;
        name: string;
        email: string;
        accessToken: string;
    }
}

export class UserProfileResponseDto {
    status: number;
    message: string;
    user?: {
        userId: string;
        name: string;
        email: string;
    }
}
