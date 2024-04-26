import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();
  if (session) {
    const user = JSON.parse(session.user!.name!);
    return redirect(`/${user.role}`);
  } else {
    return redirect("/");
  }
}
