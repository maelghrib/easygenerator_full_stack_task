import {ApiProperty} from "@nestjs/swagger";

class UserData {
    @ApiProperty({example: '123e4567-e89b-12d3-a456-426614174000'})
    userId: string;

    @ApiProperty({example: 'John Doe'})
    name: string;

    @ApiProperty({example: 'john@example.com'})
    email: string;
}

export class UserProfileResponse {
    @ApiProperty({example: 200})
    status: number;

    @ApiProperty({example: 'User profile fetched successfully'})
    message: string;

    @ApiProperty({type: UserData, required: false})
    user?: UserData;
}
