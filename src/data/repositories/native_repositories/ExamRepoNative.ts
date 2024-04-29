import { CreateExamDto } from "src/data/dto's/CreateExamDto";
import { IExamRepo } from "../interfaces/IExamRepo";
import { inject, injectable } from "inversify";
import { DbContextNative } from "src/data/database_interfaces/DbContextNative";


@injectable()
export class ExamRepoNative implements IExamRepo {
    private readonly dbContext: DbContextNative;
    constructor(@inject("DbContextNative") dbContext: DbContextNative) {
        this.dbContext = dbContext;
    }   


    public async getExamById(examId: Number): Promise<any> {
        var sql = "SELECT EXAMS.exam_id, questions.content, exams_questions,  FROM EXAMS WHERE exam_id = ?;";
        
        try {
            
        } catch (error) {
            
        }
    }

    public async createExam(createExamDto: CreateExamDto) : Promise<any> {
        try {
            var sql = "Insert into exams(course_id, semester_id) VALUES(?, ?);"
            await this.dbContext.insertOrUpdate(sql, [createExamDto.courseId, createExamDto.semesterId]);
            var exam = await this.dbContext.getRow("select exam_id from exam where semester_id = ? and course_id = ?;", [createExamDto.courseId, createExamDto.semesterId]);
            var questionsId = createExamDto.questionsId;
            questionsId.forEach(async (element) => await this.assignQuestion(exam.exam_id, element));
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    private async assignQuestion(examId: Number, questionId: Number): Promise<any> {
        try {
            var sql = "Insert into exam_questions(exam_id, question_id) VALUES(?, ?);"
            await this.dbContext.insertOrUpdate(sql, [examId, questionId]);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}