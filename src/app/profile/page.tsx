import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import ProfileContent from '../_components/profile/ProfileContent'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function Profile() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-primary-blue dark:text-white mb-8">Profile</h1>
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">You must be logged in to view this page</p>
          <Link href="/login">
            <Button className="bg-primary-blue hover:bg-blue-700 text-white">Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <ProfileContent user={session.user} />
  )
}