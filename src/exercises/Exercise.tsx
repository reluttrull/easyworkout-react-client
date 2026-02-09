import type { ExerciseResponse } from './interfaces'

interface ExerciseProps {
    exercise:ExerciseResponse;
};

function Exercise({ exercise }: ExerciseProps) {
  return (
        <div className="vertical-spacing">
            <h4>Exercise: {exercise.name}</h4>
            <div className="indent"><strong>Notes: </strong>{exercise.notes}</div>
            <div className="indent"><em>Last edited: </em>
              {new Date(exercise.lastEditedDate).toLocaleString()}</div>
            <div className="indent"><strong>Number of sets: </strong>
              {exercise.exerciseSets.length}</div>
        </div>
  )
}

export default Exercise