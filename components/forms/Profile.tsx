"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Profile({
  user,
}: {
  user: { name: string; email: string; password: string; role: string };
}) {
  return (
    <div className="overflow-auto flex flex-col items-center justify-center w-full h-full p-4">
      <Card className="bg-zinc-900 border-2 max-h-full overflow-auto">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 p-6 w-full [&>*]:flex [&>div>label]:font-bold">
          <div>
            <label htmlFor="name">Name:&nbsp;</label>
            <p id="name">{user.name}</p>
          </div>
          <div>
            <label htmlFor="email">Email:&nbsp;</label>
            <p id="email">{user.email}</p>
          </div>
          <div>
            <label htmlFor="password">Password:&nbsp;</label>
            <p id="password">{user.password}</p>
          </div>
          <div>
            <label htmlFor="role">Role:&nbsp;</label>
            <p id="role">{user.role}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
