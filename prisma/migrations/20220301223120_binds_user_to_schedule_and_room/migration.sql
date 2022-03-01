-- CreateEnum
CREATE TYPE "ScheduleAvailability" AS ENUM ('AVAILABLE', 'UNAVAILABLE', 'RESERVED');

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "availability" "ScheduleAvailability" NOT NULL DEFAULT E'RESERVED',
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
