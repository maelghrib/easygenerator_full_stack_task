import {Injectable, Logger} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {User} from '../schemas/user.schema';
import {Model} from 'mongoose';
import {ResponseMessage, ResponseStatus} from '../common/constants';
import {UserProfileResponse} from './users.types';
import {UserDto} from './users.dto';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(@InjectModel(User.name) private userModel: Model<User>) {
    }

    async saveUser(userDto: UserDto): Promise<User> {
        const newUser = new this.userModel(userDto);
        const savedUser = await newUser.save();

        this.logger.log(`User created: ${savedUser.email} (id=${savedUser.userId})`);

        return savedUser;
    }

    async findUser(email: string): Promise<User | null> {
        this.logger.debug(`Looking up user by email: ${email}`);
        return await this.userModel.findOne({email: email}).exec()
    }

    async getProfile(email: string): Promise<UserProfileResponse> {
        const user: User | null = await this.findUser(email);

        if (!user) {
            this.logger.warn(`Profile request failed: user not found (${email})`);
            return {
                status: ResponseStatus.NOT_FOUND,
                message: ResponseMessage.USER_IS_NOT_FOUND,
            };
        }

        this.logger.log(`Profile fetched for user: ${email}`);

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
