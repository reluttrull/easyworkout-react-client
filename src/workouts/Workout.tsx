import type { WorkoutResponse } from './interfaces'

interface WorkoutProps {
    workout:WorkoutResponse;
};

function Workout({ workout }: WorkoutProps) {
  return (
        <div className="vertical-spacing">
            <h3>Workout: {workout.name}</h3>
            <div className="indent"><strong>Notes: </strong>{workout.notes}</div>
            <div className="indent"><em>Last edited: </em>
              {new Date(workout.lastEditedDate).toLocaleString()}</div>
            {workout.lastCompletedDate && <div className="indent"><em>Last completed: </em>
              {new Date(workout.lastCompletedDate).toLocaleString()}</div>}
            <div className="indent"><strong>Number of exercises: </strong>
              {workout.exercises.length}</div>
        </div>
  )
}

export default Workout