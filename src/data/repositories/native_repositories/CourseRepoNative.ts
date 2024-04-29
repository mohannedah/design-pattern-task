import { inject, injectable } from "inversify";
import { ICourseRepo } from "../interfaces/ICourseRepo";
import { DbContextNative } from "src/data/database_interfaces/DbContextNative";
import { CreateCourseDto } from "src/data/dto's/CreateCourseDto";
import { AssignCourseDto } from "src/data/dto's/AssignCourseDto";
import { CreateChapterDto } from "src/data/dto's/CreateChapterDto";
import { CreateQuestionDto } from "src/data/dto's/CreateQuestionDto";


@injectable()
export class CourseRepoNative implements ICourseRepo {
    
    private readonly dbContext: DbContextNative;
    private readonly possibilities: [string, string][] = [];
    constructor(@inject("DbContextNative") dbContext: DbContextNative) {
        this.dbContext = dbContext;
        
        var difficulty = ['easy', 'difficult'];
        var objective = ['reminding', 'understanding', 'creativity']


        difficulty.forEach((diff) => {
            objective.forEach((obj) => {
                this.possibilities.push([diff, obj]);
            })
        })
    }
    

    async getCourseDetailed(courseId: Number) : Promise<any> {
        var sql = "SELECT courses.name as courseName, chapters.chapter_id as chapterId, chapters.chapter_name as chapterName, questions.question_id as questionId, questions.content as questionContent, choices.content as choiceContent, CONCAT(questions.difficulty, '/', questions.objective) as category from chapters inner join courses   on courses.course_id = chapters.course_id inner join questions on questions.chapter_id = chapters.chapter_id inner join choices on choices.question_id = questions.question_id where chapters.course_id = ? order by chapters.chapter_id, questions.question_id;";
        const rows = await this.dbContext.getAllRows(sql, [courseId]);
        const result = {};
        const courseName = rows[0].courseName;
        while(rows.length > 0) {
            let row = rows.pop();
            if(!(row.chapterName in result)) result[row.chapterName] = {questions: {}};
            if(!(row.category in result[row.chapterName].questions)) result[row.chapterName].questions[row.category] = [];
            const lastQuestionId = row.questionId;
            // console.log(result);
            result[row.chapterName].questions[row.category].push({questionContent: row.questionContent, questionId: lastQuestionId, choices: [row.choiceContent]});
            while(rows.length > 0 && rows[rows.length - 1].questionId === lastQuestionId) {
                row = rows.pop();
                const length = result[row.chapterName].questions[row.category].length - 1;
                result[row.chapterName].questions[row.category][length].choices.push(row.choiceContent)
            }
        }
        // console.log({...result, courseName});
        return {...result, courseName};
    }

    getCourseById(courseId: Number): Promise<any> {
        var sql = "SELECT courses.course_id, courses.name, chapters.chapter_name, questions.difficulty, questions.objective, COUNT(questions.question_id) as 'cnt_type' FROM COURSES INNER JOIN CHAPTERS ON chapters.course_id = courses.course_id INNER JOIN questions on questions.chapter_id = chapters.chapter_id WHERE courses.course_id = ? group by questions.difficulty, questions.objective, chapters.chapter_id order by chapters.chapter_number, questions.difficulty, questions.objective;";
        return new Promise<any>((resolve, reject) => {
            this.dbContext.getAllRows(sql, [courseId]).then((result) => {
                var res = [] as any;
                while(result.length > 0) {
                    
                    var chapterInfo = {chapterName: result[result.length - 1].chapter_name, questions: {}};
                    
                    this.possibilities.forEach(element => {
                        chapterInfo.questions[`${element[0]}/${element[1]}`] = -1;
                    });
                    for(var i = 0; i < 6; i++) {
                        var row = result.pop();
                        chapterInfo.questions[`${row.difficulty}/${row.objective}`] = row.cnt_type;
                    }
                    res.push(chapterInfo);
                }
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        });
    }


    async getAllSemesters(): Promise<any> {
        var sql = "SELECT * FROM from semester_details";
        return await this.dbContext.getAllRows(sql, []);
    }

    createCourse(createCourseDto: CreateCourseDto) : Promise<any> {
        var sql = "INSERT INTO COURSES(name) VALUES(?);";
        return new Promise<any>((resolve, reject) => {
            this.dbContext.insertOrUpdate(sql, [createCourseDto.name]).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        })
    }


    async assignCourse(AssignCourseDto: AssignCourseDto): Promise<any> {
        var sql = "INSERT INTO teachers_courses(teacher_id, course_id) VALUES(?, ?);";
        return new Promise<any>((resolve, reject) => {
            this.dbContext.insertOrUpdate(sql, [AssignCourseDto.teacher_id, AssignCourseDto.course_id]).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        })
    }


    getCoursesChapters(courseId: number): Promise<any> {
        var sql = "Select chapter_number, chapter_name from chapters where course_id=?;";
        return new Promise<any>((resolve, reject) => {
            this.dbContext.getAllRows(sql, [courseId]).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        })
    };


    createChapter(createChapterDto: CreateChapterDto): Promise<any> {
        var sql = "Insert into chapters(chapter_name, course_id) VALUES(?, ?);";
        return new Promise<any>((resolve, reject) => {
            this.dbContext.insertOrUpdate(sql, [createChapterDto.name, createChapterDto.courseId]).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    createQuestion(createQuestionDto: CreateQuestionDto): Promise<any> {
        var sql = "Insert into questions(content, difficulty, objective, chapter_id) VALUES(?,?,?,?);";
        return new Promise<any>((resolve, reject) => {
            this.dbContext.insertOrUpdate(sql, [createQuestionDto.content, createQuestionDto.difficulty, createQuestionDto.objective, createQuestionDto.chapterId]).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        })
    }
}