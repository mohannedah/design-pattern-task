export class CreateQuestionDto {
    public readonly content: string;
    public readonly chapterId: number;
    public readonly difficulty: string;
    public readonly objective: string;
}