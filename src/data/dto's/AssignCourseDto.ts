export class AssignCourseDto {
    public readonly teacher_id: number;
    public readonly course_id: number;


    /**
     *
     */
    constructor(teacher_id: number, course_id: number) {
        this.course_id = course_id;
        this.teacher_id = teacher_id;
    }
}