import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import getUsers from "./getusers";

export default async function Home() {
  // const authDetails = auth();
  // const user = await currentUser();
  const users = await getUsers();
  console.log(users, "users");
  return <h1>Heyy</h1>;
}
