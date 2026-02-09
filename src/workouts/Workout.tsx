import type { WorkoutResponse } from './interfaces'

interface WorkoutProps {
    workout:WorkoutResponse;
};

function Workout({ workout }: WorkoutProps) {
  return (
        <div className="vertical-spacing">
            <h3>Workout: {workout.name}</h3>
            <div className="indent"><strong>Notes: </strong>{workout.notes}</div>
            <div className="indent"><em>Last edited: </em>{new Date(workout.lastEditedDate).toLocaleString()}</div>
        </div>
  )
}

export default Workout