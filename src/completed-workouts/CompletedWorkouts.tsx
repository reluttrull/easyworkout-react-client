import { useEffect, useState } from 'react'
import type { CompletedWorkoutResponse } from './interfaces'
import CompletedWorkoutService from './completed-workout.service'
import CompletedWorkout from './CompletedWorkout';

function CompletedWorkouts() {
  const [completedWorkouts, setCompletedWorkouts] = useState<CompletedWorkoutResponse[]>([]);
  useEffect(() => {
    loadCompletedWorkouts();
  }, []);

  const loadCompletedWorkouts = async () => {
    let response = await CompletedWorkoutService.getAllCompletedWorkouts();
    setCompletedWorkouts(response.items);
  }
  
  const handleChildChanged = () => {
    loadCompletedWorkouts();
  }

  return (
        <>
            <h2>My Completed Workouts</h2>
            {completedWorkouts.map((completedWorkout) => (
              <CompletedWorkout key={`completed-workout${completedWorkout.id}`} completedWorkout={completedWorkout} onChange={handleChildChanged} />
            ))}
        </>
  )
}

export default CompletedWorkouts
