CREATE TABLE IF NOT EXISTS `courses`(
    `course_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS `semester_details`(
    `semester_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `year` INT NOT NULL,
    `type` enum('winter', 'summer', 'fall') NOT NULL DEFAULT 'fall'
);


