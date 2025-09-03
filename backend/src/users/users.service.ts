import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../schemas/user.schema";
import {Model} from "mongoose";
import {UserDto} from "./dto/users.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async saveUser(userDto: UserDto): Promise<User> {
        const newUser = new this.userModel(userDto);
        return await newUser.save();
    }
}
