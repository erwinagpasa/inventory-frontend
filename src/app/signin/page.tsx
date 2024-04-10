"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

import Image from 'next/image'
import Link from 'next/link';

const Signin = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: process.env.NEXT_PUBLIC_HOME });
  }

  return (
    <div className="bg-gray-100">
      <div className="w-full md:w-4/12 mx-auto flex h-screen justify-center items-center">
        <div>
          <div className="block bg-white shadow-md rounded-xl p-16">
            <div className="items-center flex flex-col justify-center w-full mb-4">
              {/* <Image
                src="/logo_auth.png"
                className="mb-3 mt-8 image"
                unoptimized
                priority={true}
                width={100}
                height={100}
                alt="..."
              /> */}
            </div>

            <h2 className="text-2xl font-semibold text-center">Sign in to your account</h2>
            <p className="text-center">Dashbboard</p>


            <button type="button" onClick={handleGoogleSignin} className="mt-5 mb-5 text-white w-full bg-gray-600 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-full text-sm px-5 py-4 text-center justify-center inline-flex items-center">
              Sign in with Email
            </button>
          </div>

          <p className="text-sm text-center font-light text-gray-500 mt-4">
            &copy; {new Date().getFullYear()} Inventory
          </p>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default Signin;