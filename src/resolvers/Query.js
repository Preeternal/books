import getCurrencyId from "../utils/getCurrencyId";

const Query = {
  currencies(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };
    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query
          },
          {
            charCode_contains: args.query
          }
        ]
      };
    }
    return prisma.query.currencies(opArgs, info);
  },
  currency(parent, args, { prisma, request }, info) {
    // const currencyId = getCurrencyId(request);
    return prisma.query.currency(args, info);
  }
};

export { Query as default };
