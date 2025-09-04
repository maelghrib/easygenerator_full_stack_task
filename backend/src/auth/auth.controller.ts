import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import {AuthService} from './auth.service';
import {
    RegisterUserDto,
    LoginUserDto,
} from './auth.dto';
import {AuthGuard} from './auth.guard';
import {JwtPayloadDecorator} from './auth.decorators';
import {JwtPayload, UserLoginResponse, UserProfileResponse, UserRegisterResponse} from './auth.types';
import {
    ApiBearerAuth,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import {APIEndpoint, ResponseMessage, ResponseStatus} from "../common/constants";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post(APIEndpoint.USER_REGISTER)
    @ApiResponse({
        status: ResponseStatus.CREATED,
        description: ResponseMessage.USER_REGISTER_SUCCESS,
        type: UserRegisterResponse,
    })
    @ApiResponse({status: ResponseStatus.BAD_REQUEST, description: ResponseMessage.VALIDATION_FAILED})
    @UsePipes(new ValidationPipe({whitelist: true}))
    async registerUser(
        @Body() registerUserDto: RegisterUserDto,
    ): Promise<UserRegisterResponse> {
        return await this.authService.registerUser(registerUserDto);
    }

    @Post(APIEndpoint.USER_LOGIN)
    @ApiResponse({
        status: ResponseStatus.SUCCESS,
        description: ResponseMessage.USER_LOGIN_SUCCESS,
        type: UserLoginResponse,
    })
    @ApiResponse({status: ResponseStatus.UNAUTHORIZED, description: ResponseMessage.INVALID_CREDENTIALS})
    @UsePipes(new ValidationPipe({whitelist: true}))
    async loginUser(
        @Body() loginUserDto: LoginUserDto,
    ): Promise<UserLoginResponse> {
        return await this.authService.loginUser(loginUserDto);
    }

    @UseGuards(AuthGuard)
    @Get(APIEndpoint.GET_PROFILE)
    @ApiBearerAuth()
    @ApiResponse({
        status: ResponseStatus.SUCCESS,
        description: ResponseMessage.USER_FETCH_SUCCESS,
        type: UserProfileResponse,
    })
    @ApiResponse({status: ResponseStatus.UNAUTHORIZED, description: ResponseMessage.UNAUTHORIZED})
    async getUserProfile(
        @JwtPayloadDecorator() jwtPayload: JwtPayload,
    ): Promise<UserProfileResponse> {
        return await this.authService.getUserProfile(jwtPayload.email);
    }
}
