import {Body, Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {RegisterUserDto, LoginUserDto, UserRegisterResponseDto, UserLoginResponseDto} from "./dto/auth.dto";

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
}
