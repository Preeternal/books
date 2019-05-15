import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../src/prisma";

const currencyOne = {
  input: { name: "рубль", nominal: 1, charCode: "руб", value: 1000000 },
  currency: undefined
  // jwt: undefined
};

// const userTwo = {
//   input: { name: "John", email: "johnny@mail.com", password: bcrypt.hashSync("manInBlack") },
//   user: undefined
//   // jwt: undefined
// };

const seedDatabase = async () => {
  // delete test data
  await prisma.mutation.deleteManyCurrencies();

  // create userOne
  currencyOne.currency = await prisma.mutation.createCurrency({
    data: currencyOne.input
  });
  // userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

  // create userTwo
  // userTwo.user = await prisma.mutation.createUser({
  //   data: userTwo.input
  // });
  // userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);
};

export { seedDatabase as default, currencyOne };
