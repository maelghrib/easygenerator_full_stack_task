import {
    Body,
    Controller,
    Post, Res,
} from '@nestjs/common';
import {AuthService} from './auth.service';
import {
    LoginDto,
    SignUpDto,
} from './auth.dto';
import {
    LoginResponse,
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
    ResponseMessage, ResponseStatus,
} from '../common/constants';
import express from 'express';

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
    async signup(@Body() signUpDto: SignUpDto): Promise<SignUpResponse> {
        return this.authService.signup(signUpDto);
    }

    @Post(APIEndpoint.LOGIN)
    @ApiOkResponse({
        description: ResponseMessage.LOGIN_SUCCESS,
        type: LoginResponse,
    })
    @ApiUnauthorizedResponse({description: ResponseMessage.INVALID_CREDENTIALS})
    async login(
        @Body() loginDto: LoginDto,
        @Res({passthrough: true}) res: express.Response
    ): Promise<LoginResponse> {

        const accessToken = await this.authService.login(loginDto);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 15 * 60 * 1000,
        });

        return {
            status: ResponseStatus.SUCCESS,
            message: ResponseMessage.LOGIN_SUCCESS,
        };
    }

    @Post(APIEndpoint.LOGOUT)
    async logout(@Res({passthrough: true}) res: express.Response): Promise<LoginResponse> {
        res.cookie('accessToken', '', {
            httpOnly: true,
            maxAge: 0,
            path: '/',
        });
        return {
            status: ResponseStatus.SUCCESS,
            message: ResponseMessage.LOGOUT_SUCCESS,
        };
    }
}
