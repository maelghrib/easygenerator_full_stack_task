import {
    Body,
    Controller, Get,
    Post, UseGuards,
} from '@nestjs/common';
import {AuthService} from './auth.service';
import {
    RefreshTokenDto,
    UserLoginDto,
    UserSignUpDto,
} from './auth.dto';
import {
    JwtPayload,
    LoginResponse,
    RefreshResponse,
    SignUpResponse, UserProfileResponse,
} from './auth.types';
import {
    ApiBearerAuth,
    ApiTags,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
    ApiBadRequestResponse, ApiResponse,
} from '@nestjs/swagger';
import {
    APIEndpoint,
    ResponseMessage,
    ResponseStatus,
} from '../common/constants';
import {AuthGuard} from "./auth.guard";
import {JwtPayloadDecorator} from "./auth.decorators";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post(APIEndpoint.SIGNUP)
    @ApiCreatedResponse({
        description: ResponseMessage.SIGNUP_SUCCESS,
        type: SignUpResponse,
    })
    @ApiBadRequestResponse({description: ResponseMessage.VALIDATION_FAILED})
    async signup(@Body() userSignUpDto: UserSignUpDto): Promise<SignUpResponse> {
        return this.authService.signup(userSignUpDto);
    }

    @Post(APIEndpoint.LOGIN)
    @ApiOkResponse({
        description: ResponseMessage.LOGIN_SUCCESS,
        type: LoginResponse,
    })
    @ApiUnauthorizedResponse({description: ResponseMessage.INVALID_CREDENTIALS})
    async login(@Body() userLoginDto: UserLoginDto): Promise<LoginResponse> {
        return this.authService.login(userLoginDto);
    }

    @Post(APIEndpoint.REFRESH)
    @ApiOkResponse({
        description: ResponseMessage.REFRESH_SUCCESS,
        type: RefreshResponse,
    })
    @ApiUnauthorizedResponse({description: ResponseMessage.EXPIRED_REFRESH_TOKEN})
    async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<RefreshResponse> {
        return this.authService.refresh(refreshTokenDto.refreshToken);
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
