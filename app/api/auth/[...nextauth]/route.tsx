import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConn from "@/lib/dbConnector";
import { FieldPacket, RowDataPacket } from "mysql2";
import { compareSync } from "bcrypt";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
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
          `select * from user where email = '${credentials.email}'`
        )) as [RowDataPacket[], FieldPacket[]];
        
        if (!results) return null;
        
        const user = results[0] as RowDataPacket & { id: string; role: string };
        user.id = user.uid.toString();
        user.name = JSON.stringify(user);
        
        const hash = user.pwd_hash;
        delete user.pwd_hash;
        delete user.name;
        user.name = JSON.stringify(user);
        
        if (compareSync(credentials.password, hash)) return user;
        return null;
      },
    }),
  ],
  callbacks: {
    session: async ({ session }) => {
      console.log('session:', session);
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