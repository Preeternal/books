import bcrypt from "bcryptjs";
import getCurrencyId from "../utils/getCurrencyId";
import generateToken from "../utils/generateToken";
import hashPassword from "../utils/hashPassword";

const Mutation = {
  async createCurrency(parent, args, { prisma }, info) {
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
  async deleteCurrency(parent, args, { prisma }, info) {
    // const userId = getCurrencyId(request);
    // return prisma.mutation.deleteUser({ where: { id: userId } }, info);
    return prisma.mutation.deleteCurrency(args, info);
  },
  async updateCurrency(parent, args, { prisma, request }, info) {
    const currencyId = getCurrencyId(request);
    // let password;
    // if (typeof args.data.password === "string") {
    //   password = await hashPassword(args.data.password);
    // } else {
    //   password = args.data.password;
    // }
    return prisma.mutation.updateCurrency(
      {
        where: {
          id: currencyId
        },
        data: {
          ...args.data
          // password
        }
      },
      info
    );
  }
};

export { Mutation as default };
