import "cross-fetch/polyfill";
import prisma from "../src/prisma";
import seedDatabase, { userOne } from "./utils/seedDatabase";
import getClient from "./utils/getClient";
import { createCurrency, getCurrencies, deleteCurrency } from "./utils/operations";

jest.setTimeout(30000);

const client = getClient();

beforeEach(seedDatabase);

test("Should create a new currency", async () => {
  const variables = {
    data: { name: "долляр", nominal: 1, charCode: "usd", value: 0.5 }
  };
  const response = await client.mutate({
    mutation: createCurrency,
    variables
  });
  // console.log(response.data.createUser);
  const exists = await prisma.exists.User({ id: response.data.createUser.id });
  expect(exists).toBe(true);
  expect(response.data.createUser.value).toBe(0.5);
});

test("Should query currencies", async () => {
  const response = await client.query({ query: getCurrencies });
  expect(response.data.users.length).toBe(1);
  expect(response.data.users[0].value).toBe(1000000);
  expect(response.data.users[0].name).toBe("рубль");
});

test("Should delete currency by ID", async () => {
  const variables = {
    where: { id: userOne.user.id }
  };
  const response = await client.mutate({
    mutation: deleteCurrency,
    variables
  });
  const exists = await prisma.exists.User({ id: response.data.deleteUser.id });
  expect(exist).toBe(false);
});

// test("Should not login with bad credentials", async () => {
//   const variables = {
//     data: { email: "preeternal@mail.com", password: "1234567" }
//   };
//   await expect(client.mutate({ mutation: login, variables })).rejects.toThrow();
// });

// test("Should not signup user with short password", async () => {
//   const variables = {
//     data: { name: "new user", email: "new@mail.com", password: "12345" }
//   };
//   await expect(client.mutate({ mutation: createUser, variables })).rejects.toThrow();
// });

// test("Should fetch user profile", async () => {
//   const client = getClient(userOne.jwt);
//   const { data } = await client.query({ query: getProfile });
//   expect(data.me.id).toBe(userOne.user.id);
//   expect(data.me.name).toBe(userOne.user.name);
//   expect(data.me.email).toBe(userOne.user.email);
// });
