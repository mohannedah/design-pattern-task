import { UserLoginDto } from "src/data/dto's/UserLoginDto";
import { UserRegisterDto } from "src/data/dto's/UserRegisterDto";

export interface IAuthService {
    login(userLoginDto: UserLoginDto): Promise<any>;
    register(userReisterDto: UserRegisterDto): Promise<any>;
}