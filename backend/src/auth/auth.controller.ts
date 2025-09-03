import {Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {
    RegisterUserDto,
    LoginUserDto,
    UserRegisterResponseDto,
    UserLoginResponseDto,
    UserProfileResponseDto
} from "./auth.dto";
import {AuthGuard} from "./auth.guard";
import {JwtPayloadDecorator} from "./auth.decorators";
import {JwtPayload} from "./auth.types";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    @UsePipes(new ValidationPipe({whitelist: true}))
    async registerUser(@Body() registerUserDto: RegisterUserDto): Promise<UserRegisterResponseDto> {
        return await this.authService.registerUser(registerUserDto);
    }

    @Post("login")
    @UsePipes(new ValidationPipe({whitelist: true}))
    async loginUser(@Body() loginUserDto: LoginUserDto): Promise<UserLoginResponseDto> {
        return await this.authService.loginUser(loginUserDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getUserProfile(@JwtPayloadDecorator() jwtPayload: JwtPayload): Promise<UserProfileResponseDto> {
        return await this.authService.getUserProfile(jwtPayload.email);
    }
}
