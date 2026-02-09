import { useEffect, useState } from 'react'
import { useAuth } from '../account/AuthContext'
import type { WorkoutResponse } from './interfaces'
import WorkoutService from './workout.service'
import Workout from './Workout';

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
            <h2>My Workouts</h2>
            {workouts.map((workout) => (
              <Workout key={`workout${workout.id}`} workout={workout} />
            ))}
        </>
  )
}

export default Workouts
