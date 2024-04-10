'use client'

import { setAppraisal } from '@/app/redux/features/appraisalSlice';
import { RootState } from '@/app/redux/store';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
} | undefined

type Props = {
  user: User,
  pagetype: string,
}

interface ReduxAppraisal {
  schoolYear: string;
  schoolName: string;
}


export default function Navbar({ user, pagetype }: Props) {

  const appraisal = useSelector((state: RootState) => state.appraisal.appraisalItems);
  const arraySchoolYear = appraisal.map(item => item.schoolYear);
  const getSchoolYear = arraySchoolYear[0];

  const navigation = [
    { name: `Academic Year: ${getSchoolYear}`, href: '#', current: false }
  ]

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  // Redux dispatch
  const dispatch = useDispatch();

  const changeYear = (getYear: any) => {
    const newReduxAppraisal: ReduxAppraisal[] = [{
      schoolName: "active",
      schoolYear: getYear,
    }];
    dispatch(setAppraisal(newReduxAppraisal));
  };



  return (
    <>
      <Disclosure as="nav" className="bg-white shadow-md fixed w-full z-50">
        {({ open }) => (
          <>
            <div className="mx-auto px-2 sm:px-6 ">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/"><Image
                      src="/logo.png"
                      className=""
                      unoptimized
                      priority={true}
                      width={40}
                      height={40}
                      alt="..."
                    /></Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-900 hover:bg-blue-800 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full bg-white p-1 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {user ? (
                          user?.image ? (
                            <Image
                              src={user?.image}
                              className="h-8 w-8 rounded-full"
                              loading="lazy"
                              unoptimized
                              width={40}
                              height={40}
                              alt="..."
                            />
                          ) : (
                            <div className="w-9 h-9 relative flex justify-center items-center rounded-full bg-gray-200 text-xs text-gray-400 uppercase">
                              {
                                user?.name?.charAt(0)
                              }
                            </div>
                          )
                        ) : null
                        }
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              onClick={() => changeYear("2023-2024")}
                              className={classNames(active ? 'bg-gray-100' : '', 'hover:cursor-pointer block px-4 py-2 text-sm text-gray-700')}
                            >
                              2023-2024
                            </span>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              onClick={() => changeYear("2022-2023")}
                              className={classNames(active ? 'bg-gray-100' : '', 'hover:cursor-pointer block px-4 py-2 text-sm text-gray-700')}
                            >
                              2022-2023
                            </span>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              onClick={() => { signOut() }}
                              className={classNames(active ? 'bg-gray-100' : '', 'hover:cursor-pointer block px-4 py-2 text-sm text-gray-700 border-t')}
                            >
                              Sign out
                            </span>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  )
}

function dispatch(arg0: { payload: ReduxAppraisal[]; type: "reduxState/setAppraisal"; }) {
  throw new Error('Function not implemented.');
}
