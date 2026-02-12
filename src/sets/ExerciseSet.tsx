import type { ExerciseSetResponse } from './interfaces'
import ExerciseService from '../exercises/exercise.service'

interface ExerciseSetProps {
    set:ExerciseSetResponse,
    exerciseId:string,
    onChange:() => void
};

function ExerciseSet({ set, exerciseId, onChange }: ExerciseSetProps) {
  const deleteSet = async () => {
    if (confirm('Are you sure you want to delete this set?')) {
      await ExerciseService.deleteSet(exerciseId, set.id);
      onChange();
    }
  }

  return (
    <>
      <div className="box set">    
        <span><strong>Set #: </strong>{ set.setNumber + 1 }</span>
        {set.reps && <span>- <strong>Reps: </strong>{ set.reps }</span>}
        {set.weight && <span>- <strong>Weight: </strong>({ set.weightUnit }) { set.weight }</span>}
        {set.duration && <span>- <strong>Duration: </strong>({ set.durationUnit }) { set.duration }</span>}
        {set.distance && <span>- <strong>Distance: </strong>({ set.distanceUnit }) { set.distance }</span>}
      </div>
      <div><button onClick={() => deleteSet()}>Delete</button></div>
    </>
  )
}

export default ExerciseSet