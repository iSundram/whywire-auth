import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            WhyWire Authentication
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to continue to WhyWire Dashboard
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/using-your-own-ui/sign-in/email-password"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In with Email
          </Link>
          
          <Link
            href="/using-your-own-ui/sign-in/magic-auth"
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In with Magic Link
          </Link>
          
          <div className="text-center">
            <Link
              href="/using-your-own-ui/sign-up/email-password"
              className="text-indigo-600 hover:text-indigo-500 text-sm"
            >
              Don&apos;t have an account? Sign up
            </Link>
          </div>
          
          <div className="text-center">
            <Link
              href="/using-your-own-ui/reset-password"
              className="text-gray-600 hover:text-gray-500 text-sm"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
