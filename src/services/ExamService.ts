import { inject, injectable } from "inversify";
import { ExamSpecifications } from "src/data/dto's/ExamSpecifications";
import { IExamRepo } from "src/data/repositories/interfaces/IExamRepo";
import { IExamService } from "./interfaces/IExamService";
import { ICourseRepo } from "src/data/repositories/interfaces/ICourseRepo";



@injectable()
export class ExamService implements IExamService {
    private readonly examRepo : IExamRepo;
    private readonly courseRepo: ICourseRepo;
    constructor(@inject("IExamRepo") examRepo : IExamRepo, @inject("ICourseRepo") courseRepo: ICourseRepo) {
        this.examRepo = examRepo;
        this.courseRepo = courseRepo;
    }

    async createExam(examSpecs: ExamSpecifications) : Promise<any> {
        try {
            const chapters = await this.courseRepo.getCourseDetailed(examSpecs.courseId);
            const result = {questions: []};
            examSpecs.chapters.forEach((chapter) => {
                Object.keys(chapter.questions).forEach((category) => {
                    var cnt: number = chapter.questions[category];
                    for (let i: number = 0; i < cnt; i++) {
                        const length = chapters[chapter.chapterName].questions[category].length;
                        var randomIdx = Math.floor(Math.random() * length);
                        var question = chapters[chapter.chapterName].questions[category].splice(randomIdx, 1);
                        result.questions.push(question);
                    }
                })
            })
            result.courseName = chapters.courseName;
            return result;
        } catch (error) {
            console.log(error);
        }
        
    }


    async saveExam() : Promise<boolean> {
        return false;
    }
}