import { useEffect, useState } from 'react'
import type { WorkoutResponse } from './interfaces'
import WorkoutService from './workout.service'
import Workout from './Workout';

function Workouts() {
  const [workouts, setWorkouts] = useState<WorkoutResponse[]>([]);
  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    let response = await WorkoutService.getAllWorkouts();
    setWorkouts(response);
  }

  const handleWorkoutChanged = () => {
    console.log('reloading workouts collection');
    loadWorkouts();
  }

  return (
        <>
            <h2>My Workouts</h2>
            {workouts.map((workout) => (
              <Workout key={`workout${workout.id}`} workout={workout} onWorkoutChanged={handleWorkoutChanged} />
            ))}
        </>
  )
}

export default Workouts
