CREATE TABLE `users` (
	`userId` INT(11) AUTO_INCREMENT,
	`username` VARCHAR(50) NOT NULL,
	`password` VARCHAR(100) NOT NULL,

	CONSTRAINT `pk_users_userid` PRIMARY KEY(`userId`),
	CONSTRAINT `uk_users_username` UNIQUE(`username`)
);

CREATE TABLE `contacts` (
	`contactId` INT(11) AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL,
	`nick` VARCHAR(20),
	`dob` DATE,
	`userId` INT(11) NOT NULL,

	CONSTRAINT `pk_contacts_contactid` PRIMARY KEY(`contactId`),
	CONSTRAINT `fk_contacts_userid` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`)
);

CREATE TABLE `emails` (
	`contactId` INT(11) NOT NULL,
	`email` VARCHAR(50) NOT NULL,

	CONSTRAINT `pk_emails_contactid_email` PRIMARY KEY(`contactId`, `email`),
	CONSTRAINT `fk_emails_contactid` FOREIGN KEY (`contactId`) REFERENCES `contacts`(`contactId`)
);
