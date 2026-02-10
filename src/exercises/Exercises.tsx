import { useEffect, useState } from 'react'
import Exercise from './Exercise'
import type { ExerciseResponse } from './interfaces'
import ExerciseService from './exercise.service'
import CreateExercise from './CreateExercise';

function Exercises() {
  const [exercises, setExercises] = useState<ExerciseResponse[]>([]);
  const [isCreateVisible, setIsCreateVisible] = useState(false);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    let response = await ExerciseService.getAllExercises();
    setExercises(response);
  }
  
  const handleExerciseChanged = () => {
    console.log('reloading exercises collection');
    setIsCreateVisible(false);
    loadExercises();
  }

  return (
        <>
            <h2>My Exercises</h2>
            {exercises.map((exercise) => (
              <Exercise key={`exercise${exercise.id}`} exercise={exercise} onExerciseChanged={handleExerciseChanged} />
            ))}
            {isCreateVisible && 
              <CreateExercise onExerciseCreated={handleExerciseChanged} onCancel={() => setIsCreateVisible(false)} />}
            <button onClick={() => setIsCreateVisible(true)}>Add workout</button>
        </>
  )
}

export default Exercises
