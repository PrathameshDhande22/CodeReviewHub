-- AlterTable
CREATE SEQUENCE reputation_id_seq;
ALTER TABLE "Reputation" ALTER COLUMN "id" SET DEFAULT nextval('reputation_id_seq');
ALTER SEQUENCE reputation_id_seq OWNED BY "Reputation"."id";
