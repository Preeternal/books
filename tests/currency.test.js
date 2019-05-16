import "cross-fetch/polyfill";
import prisma from "../src/prisma";
import seedDatabase, { currencyOne, currencyTwo } from "./utils/seedDatabase";
import getClient from "./utils/getClient";
import { createCurrency, getCurrencies, deleteCurrency, updateCurrency } from "./utils/operations";

jest.setTimeout(30000);

const client = getClient();

beforeEach(seedDatabase);

test("Should query currencies", async () => {
  const response = await client.query({ query: getCurrencies });
  expect(response.data.currencies.length).toBe(2);
  expect(response.data.currencies[0].value).toBe(1000000);
  expect(response.data.currencies[0].name).toBe("рубль");
});

test("Should create a new currency", async () => {
  const variables = {
    data: { name: "доллар", nominal: 1, charCode: "usd", value: 0.5 }
  };
  const response = await client.mutate({
    mutation: createCurrency,
    variables
  });
  const exists = await prisma.exists.Currency({ id: response.data.createCurrency.id });
  expect(exists).toBe(true);
  expect(response.data.createCurrency.value).toBe(0.5);
});

test("Should update currency nominal and value ", async () => {
  const variables = {
    data: { nominal: 2, value: 0.25 },
    where: { charCode: currencyTwo.currency.charCode }
  };
  const response = await client.mutate({
    mutation: updateCurrency,
    variables
  });
  expect(response.data.updateCurrency.nominal).toBe(2);
  expect(response.data.updateCurrency.value).toBe(0.25);
});

test("Should update unique currency charCode if it exist in data base", async () => {
  const variables = {
    data: { charCode: "usd" },
    where: { name: "евро" }
  };
  await expect(
    client.mutate({
      mutation: updateCurrency,
      variables
    })
  ).resolves.toBeTruthy();
});

test("Should delete currency by ID", async () => {
  const variables = {
    where: { id: currencyOne.currency.id }
  };
  const response = await client.mutate({
    mutation: deleteCurrency,
    variables
  });
  const exists = await prisma.exists.Currency({ id: response.data.deleteCurrency.id });
  expect(exists).toBe(false);
});

test("Should delete currency by name", async () => {
  const variables = {
    where: { name: currencyOne.currency.name }
  };
  const response = await client.mutate({
    mutation: deleteCurrency,
    variables
  });
  const exists = await prisma.exists.Currency({ name: response.data.deleteCurrency.name });
  expect(exists).toBe(false);
});

test("Should delete currency by charCode", async () => {
  const variables = {
    where: { charCode: currencyOne.currency.charCode }
  };
  const response = await client.mutate({
    mutation: deleteCurrency,
    variables
  });
  const exists = await prisma.exists.Currency({ name: response.data.deleteCurrency.charCode });
  expect(exists).toBe(false);
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
