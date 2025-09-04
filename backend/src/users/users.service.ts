import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../schemas/user.schema";
import {Model} from "mongoose";
import {ResponseMessage, ResponseStatus} from "../common/constants";
import {UserProfileResponse} from "./users.types";
import {UserDto} from "./users.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {
    }

    async saveUser(userDto: UserDto): Promise<User> {
        const newUser = new this.userModel(userDto);
        return await newUser.save();
    }

    async findUser(email: string): Promise<User | null> {
        return await this.userModel.findOne({email: email}).exec()
    }

    async getProfile(email: string): Promise<UserProfileResponse> {
        const user: User | null = await this.findUser(email);

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
