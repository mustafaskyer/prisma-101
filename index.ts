import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const createUser = async () => {
  const user = await prisma.user.create({
    data: {
      name: "John Doe 2",
      email: "jone2@gmail.com",
    },
  });
  console.log("[USER]", user);
};

const createArticle = async () => {
  const article = await prisma.article.create({
    data: {
      title: "Article 1",
      body: "Content 1",
      author: {
        connect: {
          id: 1,
        },
      },
    },
  });
  console.log("[ARTICLE]", article);
};

const getAllArticles = async () => {
  const articles = await prisma.article.findMany({
    include: { author: true },
  });
  console.log("[ARTICLES]", articles);
};

const createArticlaAndUserAndAssociate = async () => {
  const user = await prisma.user.create({
    data: {
      name: "John Doe 3",
      email: "jone3@gmail.com",
      articles: {
        create: {
          title: "Article 2",
          body: "Content 2",
        },
      },
    },
  });
  console.log("[USER]", user);
};
async function main() {
  //   createArticle();
  //   getAllArticles();
  //   createArticlaAndUserAndAssociate();
  const users = await prisma.user.findMany({
    include: { articles: true },
    where: {
      id: 1,
    },
  });
  console.log("[USERS]", users);
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
