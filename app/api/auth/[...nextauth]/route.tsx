import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import util from "util";
import db from "@/dbConnector/db";
import { cookies } from "next/headers";
// import bcrypt from 'brcypt';

const query = util.promisify(db.query).bind(db);

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

        let user = await query(
          `select * from USER where email = '${credentials.email}' `
        );
        user = user[0];

        if (!user) return null;
        // const matchPass = await bcrypt.compare(credentials.password,user.password);
        const matchPass = credentials.password === user.password;
        if (matchPass)
          cookies().set("user", JSON.stringify(user), { secure: true });

        return matchPass ? user : null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
