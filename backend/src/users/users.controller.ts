import {
    Controller, Get,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiTags,
    ApiResponse,
} from '@nestjs/swagger';
import {
    APIEndpoint,
    ResponseMessage,
    ResponseStatus,
} from '../common/constants';
import {AuthGuard} from "../auth/auth.guard";
import {JwtPayloadDecorator} from "./users.decorator";
import {JwtPayload} from "../auth/auth.types";
import {UsersService} from "./users.service";
import {UserProfileResponse} from "./users.types";

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard)
    @Get(APIEndpoint.PROFILE)
    @ApiBearerAuth()
    @ApiResponse({status: ResponseStatus.SUCCESS, description: ResponseMessage.USER_FETCH_SUCCESS,})
    @ApiResponse({status: ResponseStatus.UNAUTHORIZED, description: ResponseMessage.UNAUTHORIZED})
    async getProfile(
        @JwtPayloadDecorator() jwtPayload: JwtPayload,
    ): Promise<UserProfileResponse> {
        return await this.usersService.getProfile(jwtPayload.email);
    }
}
