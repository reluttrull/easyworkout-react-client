import { useState } from 'react'
import type { ExerciseResponse } from './interfaces'
import WorkoutService from '../workouts/workout.service'
import ExerciseService from './exercise.service'
import ExerciseSet from '../sets/ExerciseSet'
import CreateSet from '../sets/CreateSet'

interface ExerciseProps {
    exercise:ExerciseResponse,
    workoutId?: string|null,
    onExerciseChanged:() => void
};

function Exercise({ exercise, workoutId, onExerciseChanged }: ExerciseProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [isCreateSetVisible, setIsCreateSetVisible] = useState(false);
  const [name, setName] = useState(exercise.name);
  const [notes, setNotes] = useState(exercise.notes);

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const changeNotes = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  }
  
  const handleChildChanged = () => {
    onExerciseChanged();
  }

  const updateExercise = async () => {
    if (name == exercise.name && notes == exercise.notes) return;
    exercise.name = name;
    exercise.notes = notes;
    await ExerciseService.update(exercise);
    onExerciseChanged();
    setIsEditMode(false);
  }

  const removeExerciseFromWorkout = async () => {
    if (!workoutId) return;
    await WorkoutService.removeExercise(workoutId, exercise.id);
    onExerciseChanged();
  }

  const deleteExercise = async () => {
    if (confirm(`Are you sure you want to delete exercise ${exercise.name}?`)) {
      await ExerciseService.delete(exercise.id);
      onExerciseChanged();
    }
  }

  return (
      <>
        {!isEditMode &&
          <div className="vertical-spacing">
            <h4>Exercise: {exercise.name}</h4>
            <div className="indent"><strong>Notes: </strong>{exercise.notes}</div>
            <div className="indent"><em>Last edited: </em>
              {new Date(exercise.lastEditedDate).toLocaleString()}</div>
            {!isDetailVisible && 
              <div>
                <div className="indent"><strong>Number of sets: </strong>{exercise.exerciseSets.length}</div>
                <button onClick={() => setIsDetailVisible(true)}>Show detail</button>
              </div>}
            {isDetailVisible && 
              <div>
                <div className="indent">
                  {exercise.exerciseSets.map((set) => (
                    <div className="indent">
                      <ExerciseSet set={set} exerciseId={exercise.id} onChange={handleChildChanged} />
                    </div>
                  ))}
                </div>
                <div><button onClick={() => setIsDetailVisible(false)}>Hide detail</button></div>
                {isCreateSetVisible && 
                  <CreateSet exerciseId={exercise.id} onCreate={handleChildChanged} onReturn={() => setIsCreateSetVisible(false)} />}
                {!isCreateSetVisible &&
                  <div><button onClick={() => setIsCreateSetVisible(true)}>Add set</button></div>}
              </div>}
            <div><button onClick={() => setIsEditMode(true)}>Edit</button></div>
            {workoutId && <div><button onClick={removeExerciseFromWorkout}>Remove from workout</button></div>}
            <div><button onClick={deleteExercise}>Delete</button></div>
          </div>}
        {isEditMode && 
          <div>
            <h3>Edit Exercise</h3>
            <form action={updateExercise}>
              <div><input type="text" title="name" value={name} onChange={changeName} /></div>
              <div><textarea className="text-area" title="notes" value={notes ?? ""} onChange={changeNotes} /></div>
              <div><button type="submit">Update</button></div>
            </form>
            <div><button type="button" onClick={() => setIsEditMode(false)}>Cancel</button></div>
          </div>}
      </>
  )
}

export default Exercise