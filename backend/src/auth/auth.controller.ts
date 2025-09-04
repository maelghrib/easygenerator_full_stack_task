import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';
import {AuthService} from './auth.service';
import {
    RefreshTokenDto,
    UserLoginDto,
    UserSignUpDto,
} from './auth.dto';
import {
    LoginResponse,
    RefreshResponse,
    SignUpResponse,
} from './auth.types';
import {
    ApiTags,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
    ApiBadRequestResponse,
} from '@nestjs/swagger';
import {
    APIEndpoint,
    ResponseMessage,
} from '../common/constants';

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
}
