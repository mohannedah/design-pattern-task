import express from "express";
import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { ICourseRepo } from "src/data/repositories/interfaces/ICourseRepo";
import { isAuthenticated } from "src/middlewares/IsAuthenticated";



@controller('/courses')
export class CoursesController {
    private readonly coursesRepo: ICourseRepo;


    /**
     *
     */
    constructor(@inject("ICourseRepo") courseRepo: ICourseRepo) {
        this.coursesRepo = courseRepo;
    }



    @httpGet("/:id", isAuthenticated)
    public async getCourseById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const { id } = req.params;
            const course = await this.coursesRepo.getCourseById(Number(id));
            res.status(200).json(course);
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Internal Server Error"});
        }
        
    }
}