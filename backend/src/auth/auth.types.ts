import {ApiProperty} from "@nestjs/swagger";

class UserData {
    @ApiProperty({example: '123e4567-e89b-12d3-a456-426614174000'})
    userId: string;

    @ApiProperty({example: 'John Doe'})
    name: string;

    @ApiProperty({example: 'john@example.com'})
    email: string;
}

class UserWithToken extends UserData {
    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'JWT access token',
    })
    accessToken: string;
}

export class SignUpResponse {
    @ApiProperty({example: 'User signed up successfully'})
    message: string;
}

export class LoginResponse {
    @ApiProperty({ example: 'eyJhbGciOi...', description: 'JWT access token' })
    accessToken: string;

    @ApiProperty({ example: 'eyJhbGciOi...', description: 'JWT refresh token' })
    refreshToken: string;

    @ApiProperty({ example: 200, description: 'HTTP-like status' })
    status?: number;

    @ApiProperty({ example: 'Login successful', description: 'Message' })
    message?: string;
}

export class UserProfileResponse {
    @ApiProperty({example: 200})
    status: number;

    @ApiProperty({example: 'User profile fetched successfully'})
    message: string;

    @ApiProperty({type: UserData, required: false})
    user?: UserData;
}

export class JwtPayload {
    sub: string;
    email: string;
}