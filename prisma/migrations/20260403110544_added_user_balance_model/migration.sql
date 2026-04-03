-- CreateTable
CREATE TABLE "UserBalance" (
    "userId" TEXT NOT NULL,
    "credits" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserBalance_pkey" PRIMARY KEY ("userId")
);
