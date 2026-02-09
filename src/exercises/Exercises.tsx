import { useEffect, useState } from 'react'
import Exercise from './Exercise'
import { useAuth } from '../account/AuthContext'
import type { ExerciseResponse } from './interfaces'
import ExerciseService from './exercise.service'

function Exercises() {
  const auth = useAuth();
  const [exercises, setExercises] = useState<ExerciseResponse[]>([]);
  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    let response = await ExerciseService.getAllExercises(auth);
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
