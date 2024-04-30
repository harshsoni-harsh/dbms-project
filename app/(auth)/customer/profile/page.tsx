import { getServerSession } from "next-auth";
import Profile from "@/components/forms/Profile";

export default async function Page() {
  const session = await getServerSession();
  // @ts-expect-error
  const user = JSON.parse(session.user.name);
  return <Profile user={user} />;
}
