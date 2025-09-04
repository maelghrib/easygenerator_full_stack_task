import {
    Injectable,
    Logger,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {User} from '../schemas/user.schema';
import {Model} from 'mongoose';
import {ResponseMessage, ResponseStatus} from '../common/constants';
import {UserDto} from './users.dto';
import {UserProfileResponse} from "./users.types";

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(@InjectModel(User.name) private userModel: Model<User>) {
    }

    async saveUser(userDto: UserDto): Promise<User> {
        try {
            const newUser = new this.userModel(userDto);
            const savedUser = await newUser.save();

            this.logger.log(`User created: ${savedUser.email} (id=${savedUser.userId})`);

            return savedUser;
        } catch (error) {
            this.logger.error(
                `Failed to create user: ${userDto.email}`,
                error instanceof Error ? error.stack : '',
            );
            throw new InternalServerErrorException('Could not create user');
        }
    }

    async findUser(email: string): Promise<User | null> {
        try {
            this.logger.debug(`Looking up user by email: ${email}`);
            return await this.userModel.findOne({email}).exec();
        } catch (error) {
            this.logger.error(
                `Error looking up user by email: ${email}`,
                error instanceof Error ? error.stack : '',
            );
            throw new InternalServerErrorException('Database query failed');
        }
    }

    async getProfile(email: string): Promise<UserProfileResponse> {
        try {
            const user: User | null = await this.findUser(email);

            if (!user) {
                this.logger.warn(`Profile request failed: user not found (${email})`);
                throw new NotFoundException(ResponseMessage.USER_IS_NOT_FOUND);
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
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            this.logger.error(
                `Error fetching profile for ${email}`,
                error instanceof Error ? error.stack : '',
            );
            throw new InternalServerErrorException('Could not fetch user profile');
        }
    }
}
