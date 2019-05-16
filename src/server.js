import { GraphQLServer, PubSub } from "graphql-yoga";
import { resolvers, fragmentReplacements } from "./resolvers/index";
import cbr from "./cbr";
import prisma from "./prisma";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context(request) {
    return {
      pubsub,
      prisma,
      request
    };
  },
  fragmentReplacements,
  cbr
});

export { server as default };
