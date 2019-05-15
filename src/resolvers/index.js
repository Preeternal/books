import { extractFragmentReplacements } from "prisma-binding";
import Query from "./Query";
import Mutation from "./Mutation";
import Currency from "./Currency";
// import Subscription from "./Subscription";

const resolvers = {
  Query,
  Mutation,
  // Subscription,
  Currency
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers, fragmentReplacements };
