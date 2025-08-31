import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  console.log(session);
  if (!session) redirect("/signin");
  else redirect("/chat");
};

export default page;
