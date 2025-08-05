CREATE TABLE `category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`img` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `category_title_unique` ON `category` (`title`);--> statement-breakpoint
CREATE TABLE `comment` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`text` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`user_id` integer NOT NULL,
	`post_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `post_category` (
	`post_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	PRIMARY KEY(`post_id`, `category_id`),
	FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`desc` text,
	`content` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`publish_date` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`img` text,
	`views` integer DEFAULT 0 NOT NULL,
	`author_id` integer NOT NULL,
	`status` text DEFAULT 'PUBLISHED' NOT NULL,
	FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`password` text NOT NULL,
	`hashed_refresh_token` text,
	`role` text DEFAULT 'USER' NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);