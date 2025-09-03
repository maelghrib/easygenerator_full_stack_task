import {Body, Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {RegisterUserDto, UserRegisterResponseDto} from "./dto/auth.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    @UsePipes(new ValidationPipe({whitelist: true}))
    async registerUser(@Body() registerUserDto: RegisterUserDto): Promise<UserRegisterResponseDto> {
        return await this.authService.registerUser(registerUserDto);
    }
}
