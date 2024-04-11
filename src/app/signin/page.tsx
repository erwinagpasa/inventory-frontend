"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useCookies } from "react-cookie"
import Image from 'next/image'
import { useMutation, useQuery } from '@apollo/client';
import { LOGIN } from '../graphql/mutations/auth/signin';

const Signin = () => {

  const router = useRouter();
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [cookietoken, setCookietoken] = useCookies(["INV_COOKIETOKEN"])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cookietoken.INV_COOKIETOKEN) {
      router.push('/dashboard')
    }
  }, []);


  const [login, { data }] = useMutation(LOGIN);
  async function placeOrderHandler(email: string, password: string) {

    setLoading(true);

    try {

      const response = await login({
        variables: {
          input: {
            email: email,
            password: password
          },
        },
      });


      console.log(response); // Log the data returned from the mutation

      // If you want to specifically log the jwtToken:
      if (data && data.login && data.login.jwtToken) {
        console.log('JWT Token:', data.login.jwtToken.token);

        setLoading(false);
      }



    } catch (error) {
      console.error('An error occurred:', error);
    }
  }





  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: process.env.NEXT_PUBLIC_HOME });
  }

  return (
    <div className="bg-gray-100">
      <div className="w-full md:w-4/12 mx-auto flex h-screen justify-center items-center">
        <div>
          <div className="block bg-white shadow-md rounded-xl p-16">
            <div className="items-center flex flex-col justify-center w-full mb-4">
              <Image
                src="/logo_auth.png"
                className="mb-3 mt-8 image"
                unoptimized
                priority={true}
                width={100}
                height={100}
                alt="..."
              />
            </div>


            {
              !loading ? '' :
                <span>Authenticating, Please wait...</span>

            }


            <h2 className="text-2xl font-semibold text-center">Sign in to your account</h2>
            <p className="text-center">Dashbboard</p>


            <form className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input type="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                <input type="password"
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
              </div>
              <div className="flex items-center justify-between">
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline ">Forgot password?</a>
              </div>
              {/* <button type="button" onClick={submitHandler} className="w-full text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button> */}

              <button
                type="button"
                onClick={() => { placeOrderHandler("alexa@gmail.com1", "sdfs"); }}
                className="mt-2 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-center rounded-md text-sm px-5 py-2.5 mr-2 mb-2"
              >
                Place Order
              </button>

            </form>



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