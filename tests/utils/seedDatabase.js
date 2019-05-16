// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import prisma from "../../src/prisma";

const currencyOne = {
  input: { name: "рубль", nominal: 1, charCode: "руб", value: 1000000 },
  currency: undefined
  // jwt: undefined
};

const currencyTwo = {
  input: { name: "евро", nominal: 1, charCode: "eur", value: 0.6 },
  user: undefined
  // jwt: undefined
};

const seedDatabase = async () => {
  // delete test data
  await prisma.mutation.deleteManyCurrencies();

  // create currencyOne
  currencyOne.currency = await prisma.mutation.createCurrency({
    data: currencyOne.input
  });
  // userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

  // create currencyTwo
  currencyTwo.currency = await prisma.mutation.createCurrency({
    data: currencyTwo.input
  });
  // userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);
};

export { seedDatabase as default, currencyOne, currencyTwo };
