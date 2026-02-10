import type { ExerciseSetResponse } from './interfaces'

interface ExerciseSetProps {
    set:ExerciseSetResponse
};

function ExerciseSet({ set }: ExerciseSetProps) {

  return (
    <div>    
      <span><strong>Set #: </strong>{ set.setNumber + 1 }</span>
    </div>
  )
}

export default ExerciseSet