import { useEffect, useState, type ChangeEvent } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import type { WorkoutResponse } from '../workouts/interfaces'
import WorkoutService from '../workouts/workout.service'
import CompletedWorkoutService from './completed-workout.service'
import type { FinishWorkoutRequest } from './interfaces';
import type { ExerciseResponse } from '../exercises/interfaces';

function DoWorkout() {
  const { id } = useParams() as { id: string };
  const [originalWorkout, setOriginalWorkout] = useState<WorkoutResponse|null>();
  const [formData, setFormData] = useState<FinishWorkoutRequest|null>();
  const navigate = useNavigate();

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

  const updateSetValue = (eIndex:number, sIndex:number, e:ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;

    const updated = { ...formData };
    updated.completedExercises = [...updated.completedExercises];
    updated.completedExercises[eIndex] = {
        ...updated.completedExercises[eIndex],
        completedExerciseSets: [
        ...updated.completedExercises[eIndex].completedExerciseSets
        ]
    };
    updated.completedExercises[eIndex].completedExerciseSets[sIndex] = {
        ...updated.completedExercises[eIndex].completedExerciseSets[sIndex],
        [e.target.title]: e.target.value
    };

    setFormData(updated);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    await CompletedWorkoutService.finishWorkout(formData);
    navigate('/completed-workouts', { replace: true });
  }

  return (
        <form onSubmit={handleSubmit}>
            <h2>Doing workout: {originalWorkout?.name}</h2>
            {originalWorkout && <div>
                <div className="indent"><strong>Notes: </strong>{originalWorkout.notes}</div>
                <div className="indent"><em>Last edited: </em>
                {new Date(originalWorkout?.lastEditedDate).toLocaleString([], {
                  year: 'numeric', month: 'numeric', day: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })}</div>
                {originalWorkout.lastCompletedDate && <div className="indent"><em>Last completed: </em>
                {new Date(originalWorkout.lastCompletedDate).toLocaleString([], {
                  year: 'numeric', month: 'numeric', day: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })}</div>}
                <div>
                    {formData?.completedExercises.map((exercise, eIndex) => (
                        <div key={`exercise${eIndex}`} className="indent">
                            <h4>Exercise {eIndex + 1}: {exercise.fallbackName}</h4>
                            <div>
                                <div className="indent">
                                {exercise.completedExerciseSets.map((set, sIndex) => (
                                    <div key={`set${sIndex}`} className="indent">
                                        <span><strong>Set #: </strong>{ set.setNumber + 1 }</span>
                                        {set.goalReps && <span> <strong>Reps: </strong>
                                            <input type="number" placeholder="Reps" title="reps" value={set.reps ?? ''} onChange={(e) => updateSetValue(eIndex, sIndex, e)} />
                                             / { set.goalReps }</span>}
                                        {set.goalWeight && <span> <strong>Weight: </strong>
                                            <input type="number" placeholder="Weight" title="weight" step="any" value={set.weight ?? ''} onChange={(e) => updateSetValue(eIndex, sIndex, e)} />
                                            { set.goalWeight } { set.weightUnit }</span>}
                                        {set.goalDuration && <span> <strong>Duration: </strong>
                                            <input type="number" placeholder="Duration" title="duration" step="any" value={set.duration ?? ''} onChange={(e) => updateSetValue(eIndex, sIndex, e)} />
                                            { set.goalDuration } { set.durationUnit }</span>}
                                        {set.goalDistance && <span> <strong>Distance: </strong>
                                            <input type="number" placeholder="Distance" title="distance" step="any" value={set.distance ?? ''} onChange={(e) => updateSetValue(eIndex, sIndex, e)} />
                                            { set.goalDistance } { set.distanceUnit }</span>}
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