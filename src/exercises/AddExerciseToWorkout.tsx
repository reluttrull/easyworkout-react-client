import { useCallback, useEffect, useState } from 'react'
import type { ExerciseResponse } from './interfaces'
import WorkoutService from '../workouts/workout.service'
import ExerciseService from './exercise.service'
import ExerciseBrief from './ExerciseBrief';
import CreateExercise from './CreateExercise';

interface AddExerciseToWorkoutProps {
    workoutId: string,
    onUpdate: () => void,
    onClose: () => void
};

function AddExerciseToWorkout({ workoutId, onUpdate, onClose }: AddExerciseToWorkoutProps) {
  const [exercises, setExercises] = useState<ExerciseResponse[]>([]);
  const [isCreateVisible, setIsCreateVisible] = useState(false);

  useEffect(() => {
    loadExercises();
  }, []);

  const add = async (exerciseId:string) => {
    await WorkoutService.addExercise(workoutId, exerciseId);
    onUpdate();
  }

  const loadExercises = async () => {
    let response = await ExerciseService.getAllExercises();
    setExercises(response);
  }

  const handleClose = () => {
    onClose();
  }

  const handleExerciseCreated = useCallback(async (id: string) => {
    await add(id);
    onUpdate();
    onClose();
  }, []);

  return (
      <>
        {exercises.map((exercise) => (
            <div onClick={() => add(exercise.id)} >
                <ExerciseBrief exercise={exercise} />
            </div>
        ))}
        {isCreateVisible && 
            <div>
                <CreateExercise onExerciseCreated={handleExerciseCreated} onCancel={() => setIsCreateVisible(false)} />
                <button onClick={() => setIsCreateVisible(false)}>Cancel create</button>
            </div>}
        {!isCreateVisible && 
            <div><button onClick={() => setIsCreateVisible(true)}>Create new exercise</button></div>}
        <button onClick={handleClose}>Close</button>
      </>
  )
}

export default AddExerciseToWorkout