"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useCookies } from "react-cookie"
import Image from 'next/image'
import { useMutation, useQuery } from '@apollo/client';
import { LOGIN } from '../graphql/mutations/auth/signin';

import { ApolloError } from '@apollo/client/errors'; // Import ApolloError type



const Signin = () => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [credential, setCredential] = useState({
    email: '',
    password: ''
  })



  const [login, { data, loading: loginLoading, error: loginError }] = useMutation(LOGIN);


  async function submitHandler() {

    try {
      await login({
        variables: {
          email: credential.email,
          password: credential.password
        },
        notifyOnNetworkStatusChange: true,
      });

      setIsLoading(false);
      // Handle success response

      if (!loginLoading && !loginError) {
        console.log(data)
      }

    } catch (error) {
      setIsLoading(false);

      if (error && (error as ApolloError).graphQLErrors && (error as ApolloError).graphQLErrors.length > 0) {
        const graphqlError = (error as ApolloError).graphQLErrors[0];
        if (graphqlError.extensions && graphqlError.extensions.code === 'UNAUTHENTICATED') {
          // Handle authentication error
          console.error('Authentication error:', graphqlError.message);
          // Display error message to the user
          alert(graphqlError.message); // You can replace this with a more elegant UI component
        } else {
          console.error('Other GraphQL error:', graphqlError);
        }
      } else {
        console.error('Other error:', error);
      }


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
              !isLoading ? '' :
                <span>Authenticating, Please wait...</span>

            }


            <h2 className="text-2xl font-semibold text-center">Sign in to your account</h2>
            <p className="text-center">Dashbboard</p>


            <form className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input type="email"
                  name="email"
                  value={credential.email}
                  onChange={(e) => setCredential({ ...credential, email: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                <input type="password"
                  name="password"
                  value={credential.password}
                  onChange={(e) => setCredential({ ...credential, password: e.target.value })}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
              </div>
              <div className="flex items-center justify-between">
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline ">Forgot password?</a>
              </div>
              {/* <button type="button" onClick={submitHandler} className="w-full text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button> */}


              <button
                type="button"
                onClick={submitHandler}
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Submit
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