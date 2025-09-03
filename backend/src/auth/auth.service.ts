import {Injectable} from '@nestjs/common';
import {RegisterUserDto, UserRegisterResponseDto} from "./dto/auth.dto";
import * as argon from "argon2";
import {UsersService} from "../users/users.service";
import {User} from "../schemas/user.schema";
import {ResponseMessage, ResponseStatus} from "../common/constants";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

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
}
