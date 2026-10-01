import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

export default async function getUsers(){
    const cookieStore = await cookies();
    const url= "http://localhost:3000/api/auth/signup"
    console.log("Fetching:", url);

    const { getToken } = await auth(); // auth() is async too in current Clerk
    const token = await getToken();

    const res = await fetch(url, {
        cache: "no-store",
        headers: {
            Cookie: cookieStore.toString(),
            Authorization: `Bearer ${token}`
        },
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Request failed ${res.status}: ${text.slice(0, 200)}`);
    }

    return res.json();
}