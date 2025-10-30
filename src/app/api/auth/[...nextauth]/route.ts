// app/api/auth/[...nextauth]/route.ts

import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth"; // 1. Importa el TIPO 'AuthOptions'
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";

// 2. DEFINE Y EXPORTA tu configuración como una constante
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // Tus callbacks están perfectos para añadir el ID
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  // debug: true,
};

// 3. Pasa las opciones que acabas de definir a NextAuth
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
