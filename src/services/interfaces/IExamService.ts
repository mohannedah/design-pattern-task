import { ExamSpecifications } from "src/data/dto's/ExamSpecifications";


export interface IExamService {
    createExam(examSpecs: ExamSpecifications): Promise<boolean>;
    saveExam() : Promise<boolean>;
}