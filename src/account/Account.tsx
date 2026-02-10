import { useEffect, useState } from 'react'
import type { UserResponse } from './interfaces'
import AccountService from './account.service'

function Account() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [user, setUser] = useState<UserResponse|null>(null);

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    let response = await AccountService.loadUser();
    setUser(response);
  }

  return (
        <>
            {!isEditMode && 
              <div>
                <h2>Account information</h2>
                <div><button onClick={() => setIsEditMode(true)}>Edit</button></div>
                <div><strong>First name: </strong>{user?.firstName}</div>
                <div><strong>Last name: </strong>{user?.lastName}</div>
                {user?.email && <div><strong>Email address: </strong>{user.email}</div>}
                {user?.userName && <div><strong>Username: </strong>{user.userName}</div>}
                <div><strong>Member since: </strong>{user ? new Date(user?.joinedDate).toLocaleString() : ''}</div>
                <div><strong>Last edited: </strong>{user ? new Date(user?.lastEditedDate).toLocaleString() : ''}</div>
              </div>}
            {isEditMode && 
              <div>
                edit account info
                <button onClick={() => setIsEditMode(false)}>Cancel</button>
              </div>}
        </>
  )
}

export default Account
