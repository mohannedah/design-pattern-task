import express from "express";
import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { ExamSpecifications } from "src/data/dto's/ExamSpecifications";
import { isAuthenticated } from "src/middlewares/IsAuthenticated";
import { IExamService } from "src/services/interfaces/IExamService";



@controller('/exam')
export class ExamController {
    /**
     *
     */
    private readonly examService: IExamService;
    constructor(@inject("IExamService") examService: IExamService) {
        this.examService = examService;
    }

    @httpPost("/create", isAuthenticated)
    async create(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            let examSpecs = req.body.examSpecs;
            examSpecs = new ExamSpecifications(examSpecs.courseId, examSpecs.chapters); 
            const exam = await this.examService.createExam(examSpecs);
            console.log(exam);
        } catch (error) {
            console.log(error);
        }
    }
}