import {ApiProperty} from "@nestjs/swagger";

export class SignUpResponse {
    @ApiProperty({example: 'User signed up successfully'})
    message: string;
}

export class LoginResponse {
    @ApiProperty({example: '200'})
    status: number;

    @ApiProperty({example: 'User logged up successfully'})
    message: string;
}

export class JwtPayload {
    sub: string;
    email: string;
}