import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import type { WorkoutResponse } from '../workouts/interfaces'
import WorkoutService from '../workouts/workout.service'

function DoWorkout() {
  const { id } = useParams() as { id: string };
  const [originalWorkout, setOriginalWorkout] = useState<WorkoutResponse|null>();

  useEffect(() => {
    loadOriginalWorkout();
  }, [id]);

  const loadOriginalWorkout = async () => {
    const response = await WorkoutService.get(id);
    setOriginalWorkout(response);
  }

  return (
        <div>
            <h2>Doing workout: {originalWorkout?.name}</h2>
        </div>
  )
}

export default DoWorkout