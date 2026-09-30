import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function Home() {
  const authDetails = auth();
  const user = await currentUser();
  return (
    <h1>
      Heyy
      {user?.firstName} {user?.lastName}
    </h1>
  );
}
