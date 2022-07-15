import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    //Credentials({
    //  // Requires SERVER
    //  name: 'Credentials',
    //  credentials: {
    //    email: {label: "Email", type: 'email', placeholder: "Email"},
    //    password: {label: "Password", type: 'password'},
    //  },
    //  async authorize(credentials, req){
    //    const res = await fetch("/your/endpoint", {
    //      method: 'POST',
    //      body: JSON.stringify(credentials),
    //      headers: { "Content-Type": "application/json" }
    //    })
    //    const user = await res.json()
  
    //    // If no error and we have user data, return it
    //    if (res.ok && user) {
    //      return user
    //    }
    //    // Return null if user data could not be retrieved
    //    return null;
    //  }
    //})
    // ...add more providers here
  ],
});
