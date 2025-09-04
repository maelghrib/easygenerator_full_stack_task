import {IsEmail, IsNotEmpty, IsString, Matches, MinLength} from "class-validator";
import {ApiProperty} from '@nestjs/swagger';

export class UserSignUpDto {
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

export class UserLoginDto {
    @ApiProperty({description: 'The email of the user', example: 'john@example.com'})
    @IsNotEmpty()
    @IsEmail({}, {message: 'Email must be a valid email address'})
    email: string;

    @ApiProperty({description: 'The password of the user', example: 'P@ssw0rd123'})
    @IsNotEmpty()
    @IsString()
    password: string;
}

export class RefreshTokenDto {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIs...', description: 'Refresh token' })
    @IsNotEmpty()
    @IsString()
    refreshToken: string;
}
