import Image from 'next/image'
import Logo from '../../../public/My_Assets/Logo.png'
import React from 'react'
import { stackServerApp } from '@/stack'
import { LogIn } from 'lucide-react'
import Link from 'next/link'
import { UserButton } from '@stackframe/stack'
import ModeToggle from './modeToggle'


const NavBar = async () => {


    const navigate = stackServerApp.urls;
    const user = await stackServerApp.getUser();

    return (
        <div className='h-20 flex mr-6 justify-around items-center '>

            <div className='flex items-center '>
                <Image
                    src={Logo}
                    alt='Logo'
                    width={270}
                    height={250}
                    className='mt-5 '
                />

            </div>

            <div className='flex space-x-2'>

                {user ? (

                    <div className='flex gap-3 items-center'>
                        <UserButton />
                        <Link href={navigate.signOut} className='cursor-pointer flex items-center space-x-1 w-fit dark:text-wihte text-white bg-red-800 p-1 px-2 rounded-md'>
                            <LogIn />
                            <button className='text-bold cursor-pointer md:block hidden '>Sign out</button>
                        </Link>
                    </div>

                ) : (
                    <div className='flex sapce-x-2 items-center gap-2'>

                        <Link href={navigate.signIn} className='dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer flex flex-nowrap items-center space-x-1 text-white  p-1 w-26 px-2 rounded-md bg-orange-800 hover:bg-orange-700'>
                            <LogIn />
                            <button className='text-bold cursor-pointer '>Sign In</button>
                        </Link>

                        <Link href={navigate.signUp} className='flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 bg-orange-800 hover:bg-orange-700'>
                            <button className=' cursor-pointer text-bold p-1 px-2 rounded-md text-white '>Sign Up</button>
                        </Link>

                    </div>
                )}



                <ModeToggle />
            </div>



        </div>
    )
}

export default NavBar






