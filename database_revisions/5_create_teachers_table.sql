CREATE TABLE IF NOT EXISTS `teachers`(
    `teacher_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `password` VARCHAR(70) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL
);



CREATE TABLE IF NOT EXISTS `teachers_courses` (
    `teacher_id` INT NOT NULL,
    `course_id` INT NOT NULL,
    `semester_id` INT NOT NULL,
    FOREIGN KEY (`teacher_id`) REFERENCES teachers(`teacher_id`),
    FOREIGN KEY (`course_id`) REFERENCES courses(`course_id`),
    FOREIGN KEY (`semester_id`) REFERENCES semester_details(`semester_id`),
    INDEX `idx_teacher_id_course_id` (teacher_id, course_id, semester_id),
    INDEX `idx_course_id_teacher_id` (course_id, teacher_id, semester_id)
);


