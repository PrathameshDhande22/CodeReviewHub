import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@generated/prisma/client";

// Initialize the Connection
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const languages = [
  { name: "apex", extension: ".cls" },
  { name: "azcli", extension: ".azcli" },
  { name: "bat", extension: ".bat" },
  { name: "c", extension: ".c" },
  { name: "clojure", extension: ".clj" },
  { name: "coffeescript", extension: ".coffee" },
  { name: "cpp", extension: ".cpp" },
  { name: "csharp", extension: ".cs" },
  { name: "csp", extension: ".csp" },
  { name: "css", extension: ".css" },
  { name: "dockerfile", extension: ".dockerfile" },
  { name: "fsharp", extension: ".fs" },
  { name: "go", extension: ".go" },
  { name: "graphql", extension: ".graphql" },
  { name: "handlebars", extension: ".hbs" },
  { name: "html", extension: ".html" },
  { name: "ini", extension: ".ini" },
  { name: "java", extension: ".java" },
  { name: "javascript", extension: ".js" },
  { name: "json", extension: ".json" },
  { name: "kotlin", extension: ".kt" },
  { name: "less", extension: ".less" },
  { name: "lua", extension: ".lua" },
  { name: "markdown", extension: ".md" },
  { name: "msdax", extension: ".dax" },
  { name: "mysql", extension: ".sql" },
  { name: "objective-c", extension: ".m" },
  { name: "pascal", extension: ".pas" },
  { name: "perl", extension: ".pl" },
  { name: "pgsql", extension: ".sql" },
  { name: "php", extension: ".php" },
  { name: "plaintext", extension: ".txt" },
  { name: "postiats", extension: ".dats" },
  { name: "powerquery", extension: ".pq" },
  { name: "powershell", extension: ".ps1" },
  { name: "pug", extension: ".pug" },
  { name: "python", extension: ".py" },
  { name: "r", extension: ".r" },
  { name: "razor", extension: ".cshtml" },
  { name: "redis", extension: ".redis" },
  { name: "redshift", extension: ".sql" },
  { name: "ruby", extension: ".rb" },
  { name: "rust", extension: ".rs" },
  { name: "sb", extension: ".sb" },
  { name: "scheme", extension: ".scm" },
  { name: "scss", extension: ".scss" },
  { name: "shell", extension: ".sh" },
  { name: "sol", extension: ".sol" },
  { name: "sql", extension: ".sql" },
  { name: "st", extension: ".st" },
  { name: "swift", extension: ".swift" },
  { name: "tcl", extension: ".tcl" },
  { name: "typescript", extension: ".ts" },
  { name: "vb", extension: ".vb" },
  { name: "xml", extension: ".xml" },
  { name: "yaml", extension: ".yaml" },
];

export const reputationLevels = [
  { score: 0, levelname: "Newbie Reviewer" },
  { score: 100, levelname: "Code Explorer" },
  { score: 300, levelname: "Bug Hunter" },
  { score: 700, levelname: "Helpful Reviewer" },
  { score: 1200, levelname: "Insightful Analyst" },
  { score: 2000, levelname: "Code Critic" },
  { score: 3000, levelname: "Quality Guardian" },
  { score: 4500, levelname: "Refactoring Expert" },
  { score: 6000, levelname: "Architecture Advisor" },
  { score: 8000, levelname: "Senior Reviewer" },
  { score: 10000, levelname: "Principal Reviewer" },
  { score: 12000, levelname: "Code Master" },
  { score: 13500, levelname: "Elite Reviewer" },
  { score: 15000, levelname: "Legendary Architect" },
];

async function main() {
  await Promise.all(
    languages.map((language) =>
      prisma.languages.upsert({
        where: { name: language.name },
        update: { extension: language.extension },
        create: language,
      }),
    ),
  );

  await Promise.all(
    reputationLevels.map((value) =>
      prisma.reputation.upsert({
        create: { levelname: value.levelname, score: value.score },
        update: { levelname: value.levelname },
        where: { levelname: value.levelname },
      }),
    ),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
