import bcrypt from "bcryptjs";
import getUserId from "../utils/getUserId";
import generateToken from "../utils/generateToken";
import hashPassword from "../utils/hashPassword";

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const password = await hashPassword(args.data.password);
    const emailTaken = await prisma.exists.User({ email: args.data.email });
    if (emailTaken) {
      throw new Error("Email taken");
    }
    const user = prisma.mutation.createUser({
      data: {
        ...args.data,
        password
      }
    });
    return {
      user,
      token: generateToken(user.id)
    };
  },
  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.data.email
      }
    });
    if (!user) {
      throw new Error("Unable to login");
    }
    const isMatch = await bcrypt.compare(args.data.password, user.password);
    if (!isMatch) {
      throw new Error("Unable to login");
    }
    return {
      user,
      token: generateToken(user.id)
    };
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.mutation.deleteUser({ where: { id: userId } }, info);
  },
  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    let password;
    if (typeof args.data.password === "string") {
      password = await hashPassword(args.data.password);
    } else {
      password = args.data.password;
    }
    return prisma.mutation.updateUser(
      {
        where: {
          id: userId
        },
        data: {
          ...args.data,
          password
        }
      },
      info
    );
  }
};

export { Mutation as default };
