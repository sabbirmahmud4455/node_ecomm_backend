CREATE TABLE `users` (
	`userId` INT(11) AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL,
	`email` VARCHAR(100) NOT NULL,
	`phone` VARCHAR(20) NULL,
	`image` VARCHAR(190) NULL,
	`role_id` INT(100) NULL,
	`is_active` VARCHAR(100) NOT NULL,
	`password` VARCHAR(100) NOT NULL,

	CONSTRAINT `pk_users_userid` PRIMARY KEY(`userId`),
	CONSTRAINT `uk_users_email` UNIQUE(`email`)
);
