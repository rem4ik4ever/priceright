import { createRouter } from "./context";
import { z } from "zod";
import { NextAuthOptions, unstable_getServerSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "../db/client";

const authOptions:NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ]
}

export const exampleRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    async resolve({ ctx, input }) {
      const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions)
      return {
        greeting: `Hello ${input?.text ?? "world"} and user is: ${session?.user?.email}`,
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.example.findMany();
    },
  });
