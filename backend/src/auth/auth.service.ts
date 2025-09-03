import {Injectable} from '@nestjs/common';
import {
    LoginUserDto,
    RegisterUserDto,
    UserLoginResponseDto,
    UserProfileResponseDto,
    UserRegisterResponseDto
} from "./auth.dto";
import * as argon from "argon2";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {User} from "../schemas/user.schema";
import {ResponseMessage, ResponseStatus} from "../common/constants";
import {JwtPayload} from "./auth.types";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async registerUser(registerUserDto: RegisterUserDto): Promise<UserRegisterResponseDto> {

        const passwordHash: string = await argon.hash(registerUserDto.password);

        const savedUser: User = await this.usersService.saveUser({
            name: registerUserDto.name,
            email: registerUserDto.email,
            password: passwordHash,
        });

        return {
            status: ResponseStatus.CREATED,
            message: ResponseMessage.USER_REGISTER_SUCCESS,
            user: {
                userId: savedUser.userId,
                name: savedUser.name,
                email: savedUser.email,
            }
        };
    }

    async loginUser(loginUserDto: LoginUserDto): Promise<UserLoginResponseDto> {
        const user: User | null = await this.usersService.findUser(loginUserDto.email);

        if (!user) {
            return {
                status: ResponseStatus.NOT_FOUND,
                message: ResponseMessage.USER_IS_NOT_FOUND,
            };
        }

        const isPasswordMatch: boolean = await argon.verify(user.password, loginUserDto.password);

        if (!isPasswordMatch) {
            return {
                status: ResponseStatus.FORBIDDEN,
                message: ResponseMessage.PASSWORD_IS_INCORRECT,
            };
        }

        const payload: JwtPayload = {sub: user.userId, email: user.email};

        return {
            status: ResponseStatus.SUCCESS,
            message: ResponseMessage.USER_LOGIN_SUCCESS,
            user: {
                userId: user.userId,
                name: user.name,
                email: user.email,
                accessToken: await this.jwtService.signAsync(payload),
            }
        };
    }

    async getUserProfile(email: string): Promise<UserProfileResponseDto> {
        const user: User | null = await this.usersService.findUser(email);

        if (!user) {
            return {
                status: ResponseStatus.NOT_FOUND,
                message: ResponseMessage.USER_IS_NOT_FOUND,
            };
        }

        return {
            status: ResponseStatus.SUCCESS,
            message: ResponseMessage.USER_FETCH_SUCCESS,
            user: {
                userId: user.userId,
                name: user.name,
                email: user.email,
            }
        };
    }
}
