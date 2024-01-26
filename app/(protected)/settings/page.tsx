import { auth, signOut } from '@/auth'
import React from 'react'


const SettingsPage = async () => {
    const session = await auth()
  return (
    <div>
        <h1>Settings Page</h1>
        {JSON.stringify(session)}
        <form action={async () => {
          "use server";

          await signOut()
        }}>
          <button type='submit' className='border rounded-sm bg-sky-600 text-white p-2'>
            Sign out
          </button>
        </form>
    </div>

  )
}

export default SettingsPage