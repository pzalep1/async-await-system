import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(user: User): Promise<any>;
    deleteUser(userId: string, requester: any): Promise<any>;
    login(user: any): Promise<any>;
}
