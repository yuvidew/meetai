import { HomeView } from "@/modules/home/ui/views";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";



export default async function  Home() {

  const session = await auth.api.getSession({
    headers : await headers()
  });

  if(!session) {
    redirect("/sign-in");
  }

  return (
    <div className="h-screen">
      <HomeView/>
    </div>
  );
}
