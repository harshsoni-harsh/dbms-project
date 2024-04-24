import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "../api/register/route";

export default function Page() {
  const cookieStore = cookies();
  const c = cookieStore.get("user");
  const user: User = JSON.parse(c?.value!);
  redirect(`/${user?.role}/${user?.id}`);
}
