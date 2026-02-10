import { useState } from 'react'
import type { WorkoutResponse } from './interfaces'
import WorkoutService from './workout.service'
import Exercise from '../exercises/Exercise';

interface WorkoutProps {
    workout:WorkoutResponse,
    onWorkoutChanged:() => void
};

function Workout({ workout, onWorkoutChanged }: WorkoutProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [name, setName] = useState(workout.name);
  const [notes, setNotes] = useState(workout.notes);

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const changeNotes = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
   setNotes(event.target.value);
  }

  const updateWorkout = async () => {
    if (name == workout.name && notes == workout.notes) return;
    workout.name = name;
    workout.notes = notes;
    await WorkoutService.update(workout);
    onWorkoutChanged();
    setIsEditMode(false);
  }

  const deleteWorkout = async () => {
    if (confirm(`Are you sure you want to delete workout ${workout.name}?`)) {
      await WorkoutService.delete(workout.id);
      onWorkoutChanged();
    }
  }

  const handleExerciseChanged = () => {
    onWorkoutChanged();
  }

  return (
      <>
        {!isEditMode && 
          <div className="vertical-spacing">
            <h3>Workout: {workout.name}</h3>
            <div className="indent"><strong>Notes: </strong>{workout.notes}</div>
            <div className="indent"><em>Last edited: </em>
              {new Date(workout.lastEditedDate).toLocaleString()}</div>
            {workout.lastCompletedDate && <div className="indent"><em>Last completed: </em>
              {new Date(workout.lastCompletedDate).toLocaleString()}</div>}
            <div className="indent"><strong>Number of exercises: </strong>
              {workout.exercises.length}</div>
            {!isDetailVisible && <div><button onClick={() => setIsDetailVisible(true)}>Show detail</button></div>}
            {isDetailVisible && 
              <div>
                <div className="indent">
                  {workout.exercises.map((exercise) => (
                    <Exercise exercise={exercise} onExerciseChanged={handleExerciseChanged} />
                  ))}
                </div>
                <div><button onClick={() => setIsDetailVisible(false)}>Hide detail</button></div>
              </div>}
            <div><button onClick={() => setIsEditMode(true)}>Edit</button></div>
            <div><button onClick={deleteWorkout}>Delete</button></div>
          </div>}
        {isEditMode && 
          <div>
            <h3>Edit Workout</h3>
            <form action={updateWorkout}>
              <div><input type="text" title="name" value={name} onChange={changeName} /></div>
              <div><textarea className="text-area" title="notes" value={notes ?? ""} onChange={changeNotes} /></div>
              <div><button type="submit">Update</button></div>
            </form>
            <button type="button" onClick={() => setIsEditMode(false)}>Cancel</button>
          </div>}
      </>
  )
}

export default Workout