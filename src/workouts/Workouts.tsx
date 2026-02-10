import { useEffect, useState } from 'react'
import type { WorkoutResponse } from './interfaces'
import WorkoutService from './workout.service'
import Workout from './Workout';
import CreateWorkout from './CreateWorkout';

function Workouts() {
  const [isLoading, setIsLoading] = useState(true);
  const [workouts, setWorkouts] = useState<WorkoutResponse[]>([]);
  const [isCreateVisible, setIsCreateVisible] = useState(false);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    setIsLoading(true);
    let response = await WorkoutService.getAllWorkouts();
    setWorkouts(response);
    setIsLoading(false);
  }

  const handleWorkoutChanged = () => {
    console.log('reloading workouts collection');
    setIsCreateVisible(false);
    loadWorkouts();
  }

  return (
        <>
            <h2>My Workouts</h2>
            {isLoading && <div>Loading...</div>}
            {!isLoading && workouts.map((workout) => (
              <Workout key={`workout${workout.id}`} workout={workout} onWorkoutChanged={handleWorkoutChanged} />
            ))}
            {isCreateVisible && 
              <CreateWorkout onWorkoutCreated={handleWorkoutChanged} onCancel={() => setIsCreateVisible(false)} />}
            <button type="button" onClick={() => setIsCreateVisible(true)}>Add workout</button>
        </>
  )
}

export default Workouts
