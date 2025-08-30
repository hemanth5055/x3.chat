import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      credits?: number | null;
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    credits?: number | null;
    image?: string | null;
  }

  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
    credits?: number | null;
    image?: string | null;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.credits = user.credits;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name ?? null;
        session.user.email = (token.email as string) ?? null;
        session.user.credits = (token.credits as number) ?? null;
        session.user.image = (token.image as string) ?? null;
      }
      return session;
    },
  },
});
