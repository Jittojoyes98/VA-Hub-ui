import React, { useState } from "react";
import {
  ClerkProvider,
  SignUpButton,
  SignInButton,
  SignedOut,
  SignedIn,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";
import axios from "axios";

const Login = () => {
  const { userId, sessionId, getToken } = useAuth();
  const [data, setData] = useState("waiting for message");

  const fetchExternalData = async () => {
    const token = await getToken();

    // Fetch data from an external API
    const { data } = await axios.get("http://localhost:3000/api/auth/dummy", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);

    setData(data.message);
  };
  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16">
      <SignedOut>
        <SignInButton />
        <SignUpButton>
          <button className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
        <p>
          Hello, {userId}! Your current active session is {sessionId}.
        </p>
        <button onClick={fetchExternalData}>Fetch Data</button>
        <p>{data}</p>
      </SignedIn>
    </header>
  );
};

export default Login;
