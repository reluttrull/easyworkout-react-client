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
            <div className="indent">
              {completedWorkout.completedExercises.map((exercise) => (
                <div className="indent">
                  <h4>Exercise: {exercise.name}</h4>
                  {[...exercise.completedExerciseSets]
                    .sort((a, b) => a.setNumber - b.setNumber)
                    .map((set) => (
                    <div className="indent">
                      <h5>Set #{set.setNumber + 1}</h5>
                      {(set.reps || set.goalReps) &&
                        <div className="indent">{set.reps} / {set.goalReps} reps</div>}
                      {(set.weight || set.goalWeight) &&
                        <div className="indent">{set.weight} / {set.goalWeight} {set.weightUnit}</div>}
                      {(set.duration || set.goalDuration) &&
                        <div className="indent">{set.duration} / {set.goalDuration} {set.durationUnit}</div>}
                      {(set.distance || set.goalDistance) &&
                        <div className="indent">{set.distance} / {set.goalDistance} {set.distanceUnit}</div>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
        </div>
  )
}

export default CompletedWorkout