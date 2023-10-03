-- AlterTable
ALTER TABLE `users` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `verification_tokens` ADD CONSTRAINT `verification_tokens_identifier_fkey` FOREIGN KEY (`identifier`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
