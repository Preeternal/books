// import bcrypt from "bcryptjs";
// import getCurrencyId from "../utils/getCurrencyId";
// import generateToken from "../utils/generateToken";
// import hashPassword from "../utils/hashPassword";

const Mutation = {
  createCurrency(parent, args, { prisma }, info) {
    // const password = await hashPassword(args.data.password);
    // const user = prisma.mutation.createUser({
    //   data: {
    //     ...args.data
    //     // password
    //   }
    // });
    // return {
    //   user
    //   // token: generateToken(user.id)
    // };
    return prisma.mutation.createCurrency(args, info);
  },
  // async login(parent, args, { prisma }, info) {
  //   const user = await prisma.query.user({
  //     where: {
  //       email: args.data.email
  //     }
  //   });
  //   if (!user) {
  //     throw new Error("Unable to login");
  //   }
  //   const isMatch = await bcrypt.compare(args.data.password, user.password);
  //   if (!isMatch) {
  //     throw new Error("Unable to login");
  //   }
  //   return {
  //     user,
  //     token: generateToken(user.id)
  //   };
  // },
  deleteCurrency(parent, args, { prisma }, info) {
    // const userId = getCurrencyId(request);
    // return prisma.mutation.deleteUser({ where: { id: userId } }, info);
    return prisma.mutation.deleteCurrency(args, info);
  },
  updateCurrency(parent, args, { prisma }, info) {
    // const currencyId = getCurrencyId(request);
    // let password;
    // if (typeof args.data.password === "string") {
    //   password = await hashPassword(args.data.password);
    // } else {
    //   password = args.data.password;
    // }
    return prisma.mutation.updateCurrency(args, info);
  },
  upsertCurrency(parent, args, { prisma }, info) {
    return prisma.mutation.upsertCurrency(args, info);
  },
  createHeroku(parent, args, { prisma }, info) {
    return prisma.mutation.createHeroku(args, info);
  },
  updateHeroku(parent, args, { prisma }, info) {
    return prisma.mutation.updateHeroku(args, info);
  },
  deleteHeroku(parent, args, { prisma }, info) {
    return prisma.mutation.deleteHeroku(args, info);
  }
};

export { Mutation as default };
