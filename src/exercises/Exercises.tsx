import { useEffect, useState } from 'react'
import Exercise from './Exercise'
import type { ExerciseResponse } from './interfaces'
import ExerciseService from './exercise.service'

function Exercises() {
  const [exercises, setExercises] = useState<ExerciseResponse[]>([]);
  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    let response = await ExerciseService.getAllExercises();
    setExercises(response);
  }

  return (
        <>
            <h2>My Exercises</h2>
            {exercises.map((exercise) => (
              <Exercise key={`exercise${exercise.id}`} exercise={exercise} />
            ))}
        </>
  )
}

export default Exercises
