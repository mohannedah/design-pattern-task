CREATE TABLE IF NOT EXISTS `chapters` (
    `chapter_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `chapter_number` INT NOT NULL DEFAULT 1, 
    `chapter_name` VARCHAR(255) NOT NULL,
    `course_id` INT NOT NULL,
    FOREIGN KEY (`course_id`) REFERENCES courses(course_id),
    INDEX `idx_course_id_chapter_number` (course_id, chapter_number)
);



