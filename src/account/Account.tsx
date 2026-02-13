import { useEffect, useState } from 'react'
import type { UserResponse } from './interfaces'
import AccountService from './account.service'

function Account() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [user, setUser] = useState<UserResponse|null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    let response = await AccountService.loadUser();
    if (response) updateState(response);
  }

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  }
  
  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  }

  const handleUpdate = async () => {
    let response = await AccountService.update(firstName, lastName);
    if (response) updateState(response);
    setIsEditMode(false);
  }

  const updateState = (response:UserResponse) => {
    setUser(response);
    setFirstName(response.firstName);
    setLastName(response.lastName);
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
                <div><strong>Member since: </strong>{user ? new Date(user?.joinedDate).toLocaleString([], {
                  year: 'numeric', month: 'numeric', day: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                }) : ''}</div>
                <div><strong>Last edited: </strong>{user ? new Date(user?.lastEditedDate).toLocaleString([], {
                  year: 'numeric', month: 'numeric', day: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                }) : ''}</div>
              </div>}
            {isEditMode && 
              <div>
                <h2>Edit account information</h2>
                <form action={handleUpdate}>
                  <label htmlFor="firstName">First name</label>
                  <input type="text" title="firstName" value={firstName} onChange={handleFirstNameChange} />
                  <label htmlFor="lastName">Last name</label>
                  <input type="text" title="lastName" value={lastName} onChange={handleLastNameChange} />
                  <button type="submit">Save changes</button>
                </form>
                <button onClick={() => setIsEditMode(false)}>Cancel</button>
              </div>}
        </>
  )
}

export default Account
