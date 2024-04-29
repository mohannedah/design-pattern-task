CREATE TABLE IF NOT EXISTS `questions`(
    `question_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `chapter_id` INT NOT NULL,
    `question_number` INT NOT NULL DEFAULT 1,
    `difficulty` ENUM('easy', 'difficult') NOT NULL DEFAULT 'easy',
    `objective` ENUM('reminding', 'understanding', 'creativity') NOT NULL DEFAULT 'reminding',
    FOREIGN KEY (`chapter_id`) REFERENCES chapters(chapter_id)
);





CREATE TABLE IF NOT EXISTS `choices`(
    `choice_number` TINYINT UNSIGNED NOT NULL,
    `content` VARCHAR(150) NOT NULL,
    `question_id` INT NOT NULL,
    `is_correct` BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (`question_id`) REFERENCES questions(question_id)
);


CREATE TABLE IF NOT EXISTS `exams_questions`(
    `question_id` INT NOT NULL,
    `exam_id` INT NOT NULL
);



