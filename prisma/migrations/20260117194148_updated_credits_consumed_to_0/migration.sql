/*
  Warnings:

  - Made the column `creditsConsumed` on table `WorkflowExecution` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "WorkflowExecution" ALTER COLUMN "creditsConsumed" SET NOT NULL,
ALTER COLUMN "creditsConsumed" SET DEFAULT 0;
