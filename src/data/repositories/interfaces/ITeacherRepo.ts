import { UserRegisterDto } from "src/data/dto's/UserRegisterDto";

export interface ITeacherRepo {
    getTeacherByEmail(email: string): Promise<any>;
    registerTeacher(userReisterDto: UserRegisterDto): Promise<any>;   
    getTeachersCourses(teacher_id: number, semester_id: Number): Promise<any>;
}
