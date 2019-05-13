import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../src/prisma";

const userOne = {
  input: { name: "Jen", email: "jen@mail.com", password: bcrypt.hashSync("dark#@123dd") },
  user: undefined,
  jwt: undefined
};

const userTwo = {
  input: { name: "John", email: "johnny@mail.com", password: bcrypt.hashSync("manInBlack") },
  user: undefined,
  jwt: undefined
};

const seedDatabase = async () => {
  // delete test data
  await prisma.mutation.deleteManyUsers();

  // create userOne
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

  // create userTwo
  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input
  });
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);
};

export { seedDatabase as default, userOne, userTwo };
