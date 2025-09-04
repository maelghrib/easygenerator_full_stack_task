import {Injectable, UnauthorizedException} from '@nestjs/common';
import {
    UserLoginDto,
    UserSignUpDto,
} from "./auth.dto";
import * as argon from "argon2";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {User} from "../schemas/user.schema";
import {ResponseMessage, ResponseStatus} from "../common/constants";
import {JwtPayload, LoginResponse, RefreshResponse, SignUpResponse} from "./auth.types";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
    }

    async signup(userSignUpDto: UserSignUpDto): Promise<SignUpResponse> {

        const passwordHash: string = await argon.hash(userSignUpDto.password);

        await this.usersService.saveUser({
            name: userSignUpDto.name,
            email: userSignUpDto.email,
            password: passwordHash,
        });

        return {
            message: ResponseMessage.SIGNUP_SUCCESS,
        };
    }

    async login(userLoginDto: UserLoginDto): Promise<LoginResponse> {
        const user: User | null = await this.usersService.findUser(userLoginDto.email);

        if (!user) {
            return {
                accessToken: '',
                refreshToken: '',
                status: ResponseStatus.NOT_FOUND,
                message: ResponseMessage.USER_IS_NOT_FOUND,
            };
        }

        const isPasswordMatch: boolean = await argon.verify(user.password, userLoginDto.password);

        if (!isPasswordMatch) {
            return {
                accessToken: '',
                refreshToken: '',
                status: ResponseStatus.FORBIDDEN,
                message: ResponseMessage.PASSWORD_IS_INCORRECT,
            };
        }

        const payload: JwtPayload = {sub: user.userId, email: user.email};

        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN') || '15m',
        });

        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d',
        });

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
            status: ResponseStatus.SUCCESS,
            message: 'Login successful',
        };
    }

    async refresh(refreshToken: string): Promise<RefreshResponse> {
        try {
            const payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            });

            const newAccessToken = await this.jwtService.signAsync(
                {sub: payload.sub, email: payload.email},
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN') || '15m',
                },
            );

            return {accessToken: newAccessToken};

        } catch (error) {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }
    }

}
