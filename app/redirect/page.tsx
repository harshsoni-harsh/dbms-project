import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export default async function Page(request: Request) {
  const session = await getServerSession();
  if (session) {
    const user = JSON.parse(session.user!.name!);
    return redirect(`/${user.role}/${user.id}`);
  } else {
    return redirect("/");
  }
}
