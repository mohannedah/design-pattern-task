import express from "express";
import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { ITeacherRepo } from "src/data/repositories/interfaces/ITeacherRepo";
import { isAuthenticated } from "src/middlewares/IsAuthenticated";



@controller('/teacher')
export class TeacherController {

    private readonly teacherRepo: ITeacherRepo;
    constructor(@inject("ITeacherRepo") teacherRepo: ITeacherRepo) {
        this.teacherRepo = teacherRepo;
    }

    @httpGet("/courses", isAuthenticated)
    public async getTeachersCourses(req: express.Request, res: express.Response, next: express.NextFunction) 
    {
        try {
            const courses = await this.teacherRepo.getTeachersCourses(req.body.userId, 1);
            res.status(200).json({"success": true, result: { courses: courses}});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Internal Server Error"});
        }
    }

}