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
    UserLoginDto, UserSignUpDto,
} from './auth.dto';
import {AuthGuard} from './auth.guard';
import {JwtPayloadDecorator} from './auth.decorators';
import {JwtPayload, LoginResponse, SignUpResponse, UserProfileResponse} from './auth.types';
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

    @Post(APIEndpoint.SIGNUP)
    @ApiResponse({
        status: ResponseStatus.CREATED,
        description: ResponseMessage.SIGNUP_SUCCESS,
    })
    @ApiResponse({status: ResponseStatus.BAD_REQUEST, description: ResponseMessage.VALIDATION_FAILED})
    @UsePipes(new ValidationPipe({whitelist: true}))
    async signup(
        @Body() userSignUpDto: UserSignUpDto,
    ): Promise<SignUpResponse> {
        return await this.authService.signup(userSignUpDto);
    }

    @Post(APIEndpoint.LOGIN)
    @ApiResponse({
        status: ResponseStatus.SUCCESS,
        description: ResponseMessage.LOGIN_SUCCESS,
    })
    @ApiResponse({status: ResponseStatus.UNAUTHORIZED, description: ResponseMessage.INVALID_CREDENTIALS})
    @UsePipes(new ValidationPipe({whitelist: true}))
    async login(
        @Body() userLoginDto: UserLoginDto,
    ): Promise<LoginResponse> {
        return await this.authService.login(userLoginDto);
    }

    @UseGuards(AuthGuard)
    @Get(APIEndpoint.PROFILE)
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
