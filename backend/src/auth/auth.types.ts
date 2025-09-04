import {ApiProperty} from "@nestjs/swagger";

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

export class RefreshResponse {
    @ApiProperty({ example: 'eyJhbGciOi...', description: 'JWT access token' })
    accessToken: string;
}

export class JwtPayload {
    sub: string;
    email: string;
}