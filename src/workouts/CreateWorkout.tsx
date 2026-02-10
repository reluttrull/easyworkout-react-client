import { useState } from 'react'
import WorkoutService from './workout.service'

interface CreateWorkoutProps {
    onWorkoutCreated:() => void,
    onCancel:() => void
};

function CreateWorkout({ onWorkoutCreated, onCancel }:CreateWorkoutProps) {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  
  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const changeNotes = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
   setNotes(event.target.value);
  }

  const handleSubmit = async () => {
    await WorkoutService.create(name, notes);
    onWorkoutCreated();
  }

  return (
      <>
        <h3>Add Workout</h3>
        <form action={handleSubmit}>
            <div><input type="text" title="name" value={name} onChange={changeName} /></div>
            <div><textarea className="text-area" title="notes" value={notes ?? ""} onChange={changeNotes} /></div>
            <div><button type="submit">Save</button></div>
        </form>
        <button type="button" onClick={onCancel}>Cancel</button>
      </>
  )
}

export default CreateWorkout