import type { CompletedWorkoutResponse } from './interfaces'

interface CompletedWorkoutProps {
    completedWorkout:CompletedWorkoutResponse;
};

function CompletedWorkout({ completedWorkout }: CompletedWorkoutProps) {
  return (
        <div className="vertical-spacing">
            <h3>Workout: {completedWorkout.originalName}</h3>
            <div className="indent"><strong>Notes: </strong>
                {completedWorkout.completedNotes ?? completedWorkout.originalNotes}</div>
            <div className="indent"><em>Last edited: </em>
              {new Date(completedWorkout.lastEditedDate).toLocaleString()}</div>
            <div className="indent"><em>Workout completed on: </em>
              {new Date(completedWorkout.completedDate).toLocaleString()}</div>
            <div className="indent"><strong>Number of exercises completed: </strong>
              {completedWorkout.completedExercises.length}</div>
        </div>
  )
}

export default CompletedWorkout