import { DbContextNative } from "src/data/database_interfaces/DbContextNative";
import { ITeacherRepo } from "../interfaces/ITeacherRepo";
import { inject, injectable } from "inversify";
import { UserRegisterDto } from "src/data/dto's/UserRegisterDto";

@injectable()
export class TeacherRepoNative implements ITeacherRepo {
    private readonly dbContext: DbContextNative;
    constructor(@inject("DbContextNative") dbContext: DbContextNative) {
        this.dbContext = dbContext;
    }

    registerTeacher(userReisterDto: UserRegisterDto): Promise<any> {
        var sql = "INSERT INTO TEACHERS (NAME, EMAIL, PASSWORD) VALUES(?,?,?);"
        return new Promise<any>((resolve, reject) => {
            this.dbContext.insertOrUpdate(sql, [userReisterDto.name, userReisterDto.email, userReisterDto.password])
               .then((result) => {
                    resolve(result);
                })
               .catch((error) => {
                    reject(error);
                })
        })
    }
    
    getTeacherByEmail(email: string) : Promise<any> {
        var sql = "SELECT * from teachers where email = ?";
        return new Promise<any>((resolve, reject) => {
            this.dbContext.getRow(sql, [email]).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        })    
    }

    getTeachersCourses(teacher_id: number, semester_id: Number): Promise<any> {
        var sql = 'SELECT courses.name, courses.course_id as courseId from teachers_courses inner join courses on courses.course_id = teachers_courses.course_id where teachers_courses.teacher_id = ? and teachers_courses.semester_id = ? and not exists(select exam_id from exams where exams.course_id = courses.course_id and teachers_courses.semester_id = exams.semester_id);';
        return new Promise<any>((resolve, reject) => {
            this.dbContext.getAllRows(sql, [teacher_id, semester_id]).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        })
    }
    
    
}