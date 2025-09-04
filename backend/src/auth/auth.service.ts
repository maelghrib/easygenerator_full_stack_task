import {UnauthorizedException, Logger, Injectable} from '@nestjs/common';
import {
    LoginDto,
    SignUpDto,
} from "./auth.dto";
import * as argon from "argon2";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {User} from "../schemas/user.schema";
import {ResponseMessage, ResponseStatus} from "../common/constants";
import {JwtPayload, LoginResponse, SignUpResponse} from "./auth.types";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
    }

    async signup(signUpDto: SignUpDto): Promise<SignUpResponse> {

        const passwordHash: string = await argon.hash(signUpDto.password);

        await this.usersService.saveUser({
            name: signUpDto.name,
            email: signUpDto.email,
            password: passwordHash,
        });

        this.logger.log(`New user registered: ${signUpDto.email}`);

        return {
            status: ResponseStatus.CREATED,
            message: ResponseMessage.SIGNUP_SUCCESS,
        };
    }

    async login(loginDto: LoginDto): Promise<string> {
        const user: User | null = await this.usersService.findUser(loginDto.email);

        if (!user) {
            this.logger.warn(`Login failed - user not found: ${loginDto.email}`);
            throw new UnauthorizedException(ResponseMessage.USER_IS_NOT_FOUND);
        }

        const isPasswordMatch: boolean = await argon.verify(user.password, loginDto.password);

        if (!isPasswordMatch) {
            this.logger.warn(`Login failed - incorrect password for ${loginDto.email}`);
            throw new UnauthorizedException(ResponseMessage.PASSWORD_IS_INCORRECT);
        }

        const payload: JwtPayload = {sub: user.userId, email: user.email};

        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN') || '15m',
        });

        this.logger.log(`Login successful for ${loginDto.email}`);

        return accessToken
    }
}
