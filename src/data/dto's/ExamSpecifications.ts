

type QuestionsSpecs = {
    [questionCat: string]: number;
}

type ChapterSpecs = {
    chapterName: string;
    questions: QuestionsSpecs
}

export class ExamSpecifications {
    public readonly courseId: number;
    public readonly chapters: ChapterSpecs[];


   
    constructor(courseId: number, chapters: ChapterSpecs[]) {
        this.courseId = courseId;
        this.chapters = chapters;
    }
}