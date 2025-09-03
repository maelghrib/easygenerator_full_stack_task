import {IsEmail, IsNotEmpty, IsString, Matches, MinLength} from "class-validator";
import {ApiProperty} from '@nestjs/swagger';

export class RegisterUserDto {
    @ApiProperty({description: 'The name of the user', example: 'John Doe'})
    @IsNotEmpty()
    @IsString()
    @MinLength(3, {message: 'Name must be at least 3 characters long'})
    name: string;

    @ApiProperty({description: 'The email of the user', example: 'john@example.com'})
    @IsNotEmpty()
    @IsEmail({}, {message: 'Email must be a valid email address'})
    email: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'P@ssw0rd123',
        minLength: 8,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(8, {message: 'Password must be at least 8 characters long'})
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).*$/, {
        message: 'Password must contain at least one letter, one number, and one special character',
    })
    password: string;
}

export class LoginUserDto {
    @ApiProperty({description: 'The email of the user', example: 'john@example.com'})
    @IsNotEmpty()
    @IsEmail({}, {message: 'Email must be a valid email address'})
    email: string;

    @ApiProperty({description: 'The password of the user', example: 'P@ssw0rd123'})
    @IsNotEmpty()
    @IsString()
    password: string;
}

class UserDataDto {
    @ApiProperty({example: '123e4567-e89b-12d3-a456-426614174000'})
    userId: string;

    @ApiProperty({example: 'John Doe'})
    name: string;

    @ApiProperty({example: 'john@example.com'})
    email: string;
}

class UserWithTokenDto extends UserDataDto {
    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'JWT access token',
    })
    accessToken: string;
}

export class UserRegisterResponseDto {
    @ApiProperty({example: 201})
    status: number;

    @ApiProperty({example: 'User successfully registered'})
    message: string;

    @ApiProperty({type: UserDataDto, required: false})
    user?: UserDataDto;
}

export class UserLoginResponseDto {
    @ApiProperty({example: 200})
    status: number;

    @ApiProperty({example: 'User successfully logged in'})
    message: string;

    @ApiProperty({type: UserWithTokenDto, required: false})
    user?: UserWithTokenDto;
}

export class UserProfileResponseDto {
    @ApiProperty({example: 200})
    status: number;

    @ApiProperty({example: 'User profile fetched successfully'})
    message: string;

    @ApiProperty({type: UserDataDto, required: false})
    user?: UserDataDto;
}
