import type { ExerciseSetResponse } from './interfaces'

interface ExerciseSetProps {
    set:ExerciseSetResponse
};

function ExerciseSet({ set }: ExerciseSetProps) {

  return (
    <div>    
      <span><strong>Set #: </strong>{ set.setNumber + 1 }</span>
      {set.reps && <span>- <strong>Reps: </strong>{ set.reps }</span>}
      {set.weight && <span>- <strong>Weight: </strong>({ set.weightUnit }) { set.weight }</span>}
      {set.duration && <span>- <strong>Duration: </strong>({ set.durationUnit }) { set.duration }</span>}
      {set.distance && <span>- <strong>Distance: </strong>({ set.distanceUnit }) { set.distance }</span>}
    </div>
  )
}

export default ExerciseSet