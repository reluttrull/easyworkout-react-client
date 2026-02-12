import { useEffect, useState } from 'react'
import AccountService from '../account/account.service'
import CompletedWorkoutService from '../completed-workouts/completed-workout.service'
import type { UserResponse } from '../account/interfaces';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [lastCompletedDate, setLastCompletedDate] = useState<Date|null>(null);
  const [user, setUser] = useState<UserResponse|null>(null);
  useEffect(() => {
    loadCompletedWorkouts();
    loadUser();
    setIsLoading(false);
  }, []);
  
    const loadCompletedWorkouts = async () => {
      let response = await CompletedWorkoutService.getLastCompletedDate();
      setLastCompletedDate(response);
    }

    const loadUser = async () => {
      let response = await AccountService.loadUser();
      setUser(response);
    }

  return (
        <>
          <h2>Welcome, {user?.firstName}</h2>
            {isLoading && <div>Loading...</div>}
            {lastCompletedDate && user && lastCompletedDate >= user?.joinedDate && <div>Your last workout was on {new Date(lastCompletedDate).toLocaleString()}</div>}
        </>
  )
}

export default Home
