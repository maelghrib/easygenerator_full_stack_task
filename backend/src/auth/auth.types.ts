import {ApiProperty} from "@nestjs/swagger";

export class SignUpResponse {
    @ApiProperty({example: 'User signed up successfully'})
    message: string;
}

export class LoginResponse {
    @ApiProperty({ example: 'eyJhbGciOi...', description: 'JWT access token' })
    accessToken: string;
}

export class JwtPayload {
    sub: string;
    email: string;
}