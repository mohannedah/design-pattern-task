CREATE TABLE IF NOT EXISTS `exams` (
    `course_id` INT NOT NULL,
    `exam_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `semester_id` INT NOT NULL,
    FOREIGN KEY (`semester_id`) REFERENCES `semester_details`,
    FOREIGN KEY(`course_id`) REFERENCES courses(course_id)
);







