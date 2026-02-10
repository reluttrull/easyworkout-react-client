import { useState } from 'react'
import ExerciseService from './exercise.service'

interface CreateExerciseProps {
    onExerciseCreated:() => void,
    onCancel:() => void
};

function CreateExercise({ onExerciseCreated, onCancel }:CreateExerciseProps) {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  
  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const changeNotes = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
   setNotes(event.target.value);
  }

  const handleSubmit = async () => {
    await ExerciseService.create(name, notes);
    onExerciseCreated();
  }

  return (
      <>
        <h3>Add Exercise</h3>
        <form action={handleSubmit}>
            <div><input type="text" title="name" value={name} onChange={changeName} /></div>
            <div><textarea className="text-area" title="notes" value={notes ?? ""} onChange={changeNotes} /></div>
            <div><button type="submit">Save</button></div>
        </form>
        <button type="button" onClick={onCancel}>Cancel</button>
      </>
  )
}

export default CreateExercise