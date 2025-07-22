
import { LogIn } from "lucide-react"
import { stackServerApp } from "../../stack";
import Link from "next/link";

const NotAuthenticated = () => {

    const app=stackServerApp.urls;

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-6">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 max-w-md w-full border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
          You're not signed in
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Please log in to access this feature. Your data is safe and only visible to you.
        </p>
        <Link
          href={app.signIn}
          className="inline-flex items-center gap-2 dark:bg-blue-600 dark:hover:bg-blue-700 bg-orange-800 hover:bg-orange-700 text-white font-semibold px-5 py-2 rounded-lg transition duration-300"
        >
          <LogIn className="w-5 h-5" />
          Sign In
        </Link>
      </div>
    </div>
  )
}

export default NotAuthenticated;
