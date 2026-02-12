import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import type { WorkoutResponse } from '../workouts/interfaces'
import WorkoutService from '../workouts/workout.service'
import Exercise from '../exercises/Exercise';
import type { FinishWorkoutRequest } from './interfaces';

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
  }

  return (
        <div>
            <h2>Doing workout: {originalWorkout?.name}</h2>
            {originalWorkout && 
                <div>
                    <div className="indent"><strong>Notes: </strong>{originalWorkout.notes}</div>
                    <div className="indent"><em>Last edited: </em>
                    {new Date(originalWorkout?.lastEditedDate).toLocaleString()}</div>
                    {originalWorkout.lastCompletedDate && <div className="indent"><em>Last completed: </em>
                    {new Date(originalWorkout.lastCompletedDate).toLocaleString()}</div>}
                    
                    <div>
                        {originalWorkout.exercises.map((exercise) => (
                            <div className="indent">
                                <h4>Exercise: {exercise.name}</h4>
                                <div className="indent"><strong>Notes: </strong>{exercise.notes}</div>
                                <div className="indent"><em>Last edited: </em>
                                {new Date(exercise.lastEditedDate).toLocaleString()}</div>
                                <div>
                                    <div className="indent">
                                    {exercise.exerciseSets.map((set) => (
                                        <div className="indent">
                                            <span><strong>Set #: </strong>{ set.setNumber + 1 }</span>
                                            {set.reps && <span>- <strong>Reps: </strong>{ set.reps }</span>}
                                            {set.weight && <span>- <strong>Weight: </strong>({ set.weightUnit }) { set.weight }</span>}
                                            {set.duration && <span>- <strong>Duration: </strong>({ set.durationUnit }) { set.duration }</span>}
                                            {set.distance && <span>- <strong>Distance: </strong>({ set.distanceUnit }) { set.distance }</span>}
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>}
        </div>
  )
}

export default DoWorkout