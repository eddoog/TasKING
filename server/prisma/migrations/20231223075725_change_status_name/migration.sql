/*
  Warnings:

  - The values [COMPLETE] on the enum `Task_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `task` MODIFY `status` ENUM('INCOMPLETE', 'COMPLETED') NOT NULL DEFAULT 'INCOMPLETE';
