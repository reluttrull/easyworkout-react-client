import type { ExerciseResponse } from './interfaces'

interface ExerciseBriefProps {
    exercise:ExerciseResponse
};

function ExerciseBrief({ exercise }: ExerciseBriefProps) {

  return (
    <div>    
        <span><strong>Exercise:</strong> { exercise.name }</span> - 
        <span><strong>Notes:</strong> { exercise.notes }</span> - 
        <span><strong>Date created:</strong> { new Date(exercise.addedDate).toLocaleString() }</span>
    </div>
  )
}

export default ExerciseBrief