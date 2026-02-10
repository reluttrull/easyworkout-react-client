import { useState } from 'react'
import type { CompletedWorkoutResponse } from './interfaces'
import CompletedWorkoutService from './completed-workout.service'

interface CompletedWorkoutProps {
    completedWorkout:CompletedWorkoutResponse,
    onChange:() => void
};

function CompletedWorkout({ completedWorkout, onChange }: CompletedWorkoutProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [notes, setNotes] = useState(completedWorkout.completedNotes);

  const changeNotes = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  }

  const handleUpdate = async () => {
    await CompletedWorkoutService.update(completedWorkout.id, notes);
    setIsEditMode(false);
    onChange();
  }

  return (
        <div className="vertical-spacing">
          <div>
            <h3>Workout: {completedWorkout.originalName}</h3>
            <div className="indent"><strong>Notes: </strong>
                {completedWorkout.completedNotes ?? completedWorkout.originalNotes}</div>
            <div className="indent"><em>Last edited: </em>
              {new Date(completedWorkout.lastEditedDate).toLocaleString()}</div>
            <div className="indent"><em>Workout completed on: </em>
              {new Date(completedWorkout.completedDate).toLocaleString()}</div>
            <div className="indent"><strong>Number of exercises completed: </strong>
              {completedWorkout.completedExercises.length}</div>
            <div className="indent">
              {completedWorkout.completedExercises.map((exercise) => (
                <div key={`completed-exercise${exercise.id}`} className="indent">
                  <h4>Exercise: {exercise.name}</h4>
                  {[...exercise.completedExerciseSets]
                    .sort((a, b) => a.setNumber - b.setNumber)
                    .map((set) => (
                    <div key={`completed-exercise-set${set.id}`} className="indent">
                      <h5>Set #{set.setNumber + 1}</h5>
                      {(set.reps || set.goalReps) &&
                        <div className="indent">{set.reps} / {set.goalReps} reps</div>}
                      {(set.weight || set.goalWeight) &&
                        <div className="indent">{set.weight} / {set.goalWeight} {set.weightUnit}</div>}
                      {(set.duration || set.goalDuration) &&
                        <div className="indent">{set.duration} / {set.goalDuration} {set.durationUnit}</div>}
                      {(set.distance || set.goalDistance) &&
                        <div className="indent">{set.distance} / {set.goalDistance} {set.distanceUnit}</div>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {!isEditMode && <div><button onClick={() => setIsEditMode(true)}>Edit</button></div>}
          {isEditMode && 
            <div>
              <form action={handleUpdate}>
                <label htmlFor="notes">Notes</label>
                <textarea className="text-area" title="notes" value={notes ?? ''} onChange={changeNotes} />
                <button type="submit">Save changes</button>
              </form>
              <button onClick={() => setIsEditMode(false)}>Cancel</button>
            </div>}
        </div>
  )
}

export default CompletedWorkout