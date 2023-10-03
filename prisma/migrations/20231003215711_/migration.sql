-- DropForeignKey
ALTER TABLE `verification_tokens` DROP FOREIGN KEY `verification_tokens_identifier_fkey`;

-- AddForeignKey
ALTER TABLE `verification_tokens` ADD CONSTRAINT `verification_tokens_identifier_fkey` FOREIGN KEY (`identifier`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
