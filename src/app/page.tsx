import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';



export default async function Home() {
  const session = await getServerSession(options)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/')
  }



  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50">
      <div>
        <div className="w-full md:w-6/12 lg:5/12 mx-auto flex h-screen justify-center items-center">
          <div>
            sadasdas
          </div>
        </div>
      </div>
    </div>
  )
}
