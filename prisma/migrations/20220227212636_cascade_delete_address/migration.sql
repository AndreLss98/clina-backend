-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_roomId_fkey";

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
