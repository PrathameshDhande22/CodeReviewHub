-- CreateTable
CREATE TABLE "Reputation" (
    "id" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "levelname" TEXT NOT NULL,

    CONSTRAINT "Reputation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reputation_levelname_key" ON "Reputation"("levelname");
