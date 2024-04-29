import { AssignCourseDto } from "src/data/dto's/AssignCourseDto";
import { CreateChapterDto } from "src/data/dto's/CreateChapterDto";
import { CreateCourseDto } from "src/data/dto's/CreateCourseDto";
import { CreateQuestionDto } from "src/data/dto's/CreateQuestionDto";

export interface ICourseRepo {
    getCourseById(courseId: number): Promise<any>;
    assignCourse(assignCourseDto: AssignCourseDto): Promise<any>;
    createCourse(createCourseDto: CreateCourseDto): Promise<any>;
    getCoursesChapters(courseId: number): Promise<any>;
    createChapter(createChapterDto: CreateChapterDto): Promise<any>
    createQuestion(createQuestionDto: CreateQuestionDto): Promise<any>;
    getCourseDetailed(courseId: Number) : Promise<any>;
}