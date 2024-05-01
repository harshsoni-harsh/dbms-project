import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & { role: string; uid: number };
  }
  interface User extends DefaultUser {
    role: string;
    uid: number;
  }
}
