export class CreateChapterDto {
    public readonly name: string;
    public readonly courseId: number;

    /**
     *
     */
    constructor(name: string, courseId: number) {
        this.name = name;
        this.courseId = courseId;
    }
}