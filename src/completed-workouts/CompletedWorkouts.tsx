import { useEffect, useState } from 'react'
import type { CompletedWorkoutResponse } from './interfaces'
import CompletedWorkoutService from './completed-workout.service'
import CompletedWorkout from './CompletedWorkout';

function CompletedWorkouts() {
  const [isLoading, setIsLoading] = useState(true);
  const [completedWorkouts, setCompletedWorkouts] = useState<CompletedWorkoutResponse[]>([]);
  useEffect(() => {
    loadCompletedWorkouts();
  }, []);

  const loadCompletedWorkouts = async () => {
    setIsLoading(true);
    let response = await CompletedWorkoutService.getAllCompletedWorkouts();
    setCompletedWorkouts(response.items);
    setIsLoading(false);
  }
  
  const handleChildChanged = () => {
    loadCompletedWorkouts();
  }

  return (
        <>
            <h2>My Completed Workouts</h2>
            {isLoading && <div>Loading...</div>}
            {!isLoading && completedWorkouts.map((completedWorkout) => (
              <CompletedWorkout key={`completed-workout${completedWorkout.id}`} completedWorkout={completedWorkout} onChange={handleChildChanged} />
            ))}
        </>
  )
}

export default CompletedWorkouts
