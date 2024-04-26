import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConn from "@/lib/dbConnector";
import { FieldPacket, RowDataPacket } from "mysql2";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const conn = await dbConn;
        await conn.connect();
        const [results, fields] = (await conn.query(
          `select * from USER where email = '${credentials.email}' `
        )) as [RowDataPacket[], FieldPacket[]];
        if (!results) return null;
        const user = results[0] as RowDataPacket & { id: string; role: string };
        user.id = user.id.toString();
        user.name = JSON.stringify(user);

        return user;
      },
    }),
  ],
  callbacks: {
    session: async ({ session }) => {
      if (session) session.user = JSON.parse(session.user!.name!);
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
