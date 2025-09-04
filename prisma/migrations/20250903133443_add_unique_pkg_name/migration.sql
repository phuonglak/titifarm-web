/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `TicketPackage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TicketPackage_name_key" ON "TicketPackage"("name");
