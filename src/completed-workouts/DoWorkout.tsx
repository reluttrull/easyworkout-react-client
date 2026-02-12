import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import type { WorkoutResponse } from '../workouts/interfaces'
import WorkoutService from '../workouts/workout.service'
import Exercise from '../exercises/Exercise';
import type { FinishWorkoutRequest } from './interfaces';
import type { ExerciseResponse } from '../exercises/interfaces';

function DoWorkout() {
  const { id } = useParams() as { id: string };
  const [originalWorkout, setOriginalWorkout] = useState<WorkoutResponse|null>();
  const [formData, setFormData] = useState<FinishWorkoutRequest|null>();

  useEffect(() => {
    loadOriginalWorkout();
  }, [id]);

  const loadOriginalWorkout = async () => {
    const response = await WorkoutService.get(id);
    setOriginalWorkout(response);
    const now = new Date();

    const request: FinishWorkoutRequest = {
        workoutId: response.id,
        completedDate: now,
        completedExercises: response.exercises.map((ex:ExerciseResponse, exIndex:number) => ({
            exerciseId: ex.id,
            fallbackName: ex.name,
            completedDate: now,
            exerciseNumber: exIndex,
            completedExerciseSets: ex.exerciseSets.map((set, setIndex) => ({
                exerciseSetId: set.id,
                completedDate: now.toISOString(),
                setNumber: setIndex,
                reps: null,
                goalReps: set.reps,
                weight: null,
                goalWeight: set.weight,
                weightUnit: set.weightUnit,
                duration: null,
                goalDuration: set.duration,
                durationUnit: set.durationUnit,
                distance: null,
                goalDistance: set.distance,
                distanceUnit: set.distanceUnit
            }))
        }))
    };
    setFormData(request);
  }

  const updateSetValue = () => {

  }

  const handleSubmit = () => {

  }

  return (
        <form onSubmit={handleSubmit}>
            <h2>Doing workout: {originalWorkout?.name}</h2>
            {originalWorkout && <div>
                <div className="indent"><strong>Notes: </strong>{originalWorkout.notes}</div>
                <div className="indent"><em>Last edited: </em>
                {new Date(originalWorkout?.lastEditedDate).toLocaleString()}</div>
                {originalWorkout.lastCompletedDate && <div className="indent"><em>Last completed: </em>
                {new Date(originalWorkout.lastCompletedDate).toLocaleString()}</div>}
                
                <div>
                    {formData?.completedExercises.map((exercise, eIndex) => (
                        <div key={`exercise${eIndex}`} className="indent">
                            <h4>Exercise {eIndex + 1}: {exercise.fallbackName}</h4>
                            <div>
                                <div className="indent">
                                {exercise.completedExerciseSets.map((set, sIndex) => (
                                    <div key={`set${sIndex}`} className="indent">
                                        <span><strong>Set #: </strong>{ set.setNumber + 1 }</span>
                                        {set.goalReps && <span>- <strong>Reps: </strong>{ set.goalReps }</span>}
                                        {set.goalWeight && <span>- <strong>Weight: </strong>({ set.weightUnit }) { set.goalWeight }</span>}
                                        {set.goalDuration && <span>- <strong>Duration: </strong>({ set.durationUnit }) { set.goalDuration }</span>}
                                        {set.goalDistance && <span>- <strong>Distance: </strong>({ set.distanceUnit }) { set.goalDistance }</span>}
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
            <button type="submit">Finish and save</button>
        </form>
    )
}

export default DoWorkout