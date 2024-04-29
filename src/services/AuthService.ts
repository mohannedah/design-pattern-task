import { ITeacherRepo } from "src/data/repositories/interfaces/ITeacherRepo";
import express from "express";
import { IAuthService } from "./interfaces/IAuthService";
import { inject, injectable } from "inversify";
import bcrypt from 'bcryptjs';
import { UserLoginDto } from "src/data/dto's/UserLoginDto";
import { UserRegisterDto } from "src/data/dto's/UserRegisterDto";
import jwt from 'jsonwebtoken';
import { json } from "body-parser";






@injectable()
export class AuthService implements IAuthService {
    private readonly teacherRepo: ITeacherRepo;
    constructor(@inject("ITeacherRepo") teacherRepo: ITeacherRepo) {
        this.teacherRepo = teacherRepo;
    }

    private async generateToken(userId: number): Promise<string> {
        return await jwt.sign({userId: userId}, (process.env.SECRET_TOKEN_KEY as string), {expiresIn: '5h'});
    }

    async login(userLoginDto: UserLoginDto): Promise<any> {
        var {email, password} = userLoginDto;
        var teacher = await this.teacherRepo.getTeacherByEmail(email);
        if(teacher == null) return null;
        var result = await bcrypt.compare(password, teacher.password);
        if(!result) return null;
        var token = await this.generateToken(teacher.teacher_id);
        return {teacher_id: teacher.teacher_id, token: token};
    }


    async register(userReisterDto: UserRegisterDto): Promise<any> {
        var teacher = await this.teacherRepo.getTeacherByEmail(userReisterDto.email);
        if(teacher!= null) return null;
        var { password } = userReisterDto;
        const salt = await bcrypt.genSalt(8);
        userReisterDto.password = await bcrypt.hash(password, salt);
        return await this.teacherRepo.registerTeacher(userReisterDto);
    }


    async isAuthenticated(req: express.Request, res: express.Response, next: express.NextFunction): Promise<boolean> {
        if(!req.headers.authorization?.startsWith("Bearer")) return false;
        const token = req.headers.authorization?.split("Bearer")[1].trim();
        var payload = (await jwt.verify(token, (process.env.SECRET_TOKEN_KEY as string))) as any;
        if(!payload) return false;
        req.body.userId = payload.userId;
        return true;
    }

}