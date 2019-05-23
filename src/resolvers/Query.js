// import getCurrencyId from "../utils/getCurrencyId";

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
  currency(parent, args, { prisma }, info) {
    // const currencyId = getCurrencyId(request);
    return prisma.query.currency(args, info);
  },
  herokus(parent, args, { prisma }, info) {
    return prisma.query.herokus(args, info);
  }
};

export { Query as default };
