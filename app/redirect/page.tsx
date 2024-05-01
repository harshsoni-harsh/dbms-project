import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();
  if (session) {
    const user = JSON.parse(session.user!.name!);
    if (user.role === 'inspector') return redirect('/damage-inspector');
    if (user.role === 'dbadmin') return redirect('/db-admin');
    if (user.role === 'manager') return redirect('/manager');
    if (user.role === 'customer') return redirect('/customer');
  } else {
    return redirect("/");
  }
}