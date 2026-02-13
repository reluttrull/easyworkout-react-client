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
  const [thisExercise, setThisExercise] = useState(exercise);
  const [name, setName] = useState(exercise.name);
  const [notes, setNotes] = useState(exercise.notes);

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const changeNotes = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  }
  
  const handleChildChanged = () => {
    reloadExercise();
    setIsCreateSetVisible(false);
  }

  const updateExercise = async () => {
    if (name == thisExercise.name && notes == thisExercise.notes) return;
    thisExercise.name = name;
    thisExercise.notes = notes;
    await ExerciseService.update(thisExercise);
    reloadExercise();
    setIsEditMode(false);
  }

  const removeExerciseFromWorkout = async () => {
    if (!workoutId) return;
    await WorkoutService.removeExercise(workoutId, thisExercise.id);
    onExerciseChanged();
  }

  const deleteExercise = async () => {
    if (confirm(`Are you sure you want to delete exercise ${thisExercise.name}?`)) {
      await ExerciseService.delete(thisExercise.id);
      onExerciseChanged();
    }
  }

  const reloadExercise = async () => {
    const response = await ExerciseService.get(thisExercise.id);
    exercise = response;
    setThisExercise(response);
    setName(response.name);
    setNotes(response.notes);
  }

  return (
      <>
        {!isEditMode &&
          <div className="vertical-spacing box exercise">
            <h4>Exercise: {thisExercise.name}</h4>
            <div className="indent"><strong>Notes: </strong>{thisExercise.notes}</div>
            <div className="indent"><em>Last edited: </em>
              {new Date(thisExercise.lastEditedDate).toLocaleString([], {
                  year: 'numeric', month: 'numeric', day: 'numeric',
                  hour: '2-digit', minute: '2-digit'
              })}</div>
            {!isDetailVisible && 
              <div>
                <div className="indent"><strong>Number of sets: </strong>{thisExercise.exerciseSets.length}</div>
                <button onClick={() => setIsDetailVisible(true)}>Show detail</button>
              </div>}
            {isDetailVisible && 
              <div>
                <div className="indent">
                  {thisExercise.exerciseSets.map((set) => (
                    <div className="indent">
                      <ExerciseSet set={set} exerciseId={thisExercise.id} onChange={handleChildChanged} />
                    </div>
                  ))}
                </div>
                <div><button onClick={() => setIsDetailVisible(false)}>Hide detail</button></div>
                {isCreateSetVisible && 
                  <CreateSet exerciseId={thisExercise.id} onCreate={handleChildChanged} onReturn={() => setIsCreateSetVisible(false)} />}
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