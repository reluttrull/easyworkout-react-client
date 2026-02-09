import { useEffect, useState } from 'react'
import { useAuth } from '../account/AuthContext'
import type { WorkoutResponse } from './interfaces'
import WorkoutService from './workout.service'

function Workouts() {
  const auth = useAuth();
  const [workouts, setWorkouts] = useState<WorkoutResponse[]>([]);
  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    let response = await WorkoutService.getAllWorkouts(auth);
    setWorkouts(response);
  }

  return (
        <>
            <h2>Workouts</h2>
            {workouts.map(workout => {
              <div>{workout.name}</div>
            })}
        </>
  )
}

export default Workouts
