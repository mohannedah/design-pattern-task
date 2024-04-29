
export class CreateExamDto {
    public readonly courseId: Number;
    public readonly questionsId: Number[];
    public readonly semesterId: Number;

    constructor(courseId: Number, questionsId: Number[], semesterId: Number) {
        this.courseId = courseId
        this.questionsId = questionsId;
        this.semesterId = semesterId;
    }
}
