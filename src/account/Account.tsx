import { useState } from 'react'

function Account() {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
        <>
            {!isEditMode && 
              <div>
                view account info
                <button onClick={() => setIsEditMode(true)}>Edit</button>
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
