"use client";

import UserInfo from '@/components/userInfo';
import { useCurrentUser } from '@/hooks/useCurrentUser';


const ClientPage = () => {
    const user = useCurrentUser();
  return (
    <div>
        <UserInfo 
          label='Client component :)'
          user={user}
        />
    </div>
  )
}

export default ClientPage