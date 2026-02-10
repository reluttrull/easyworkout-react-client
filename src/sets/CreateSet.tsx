import { useState } from 'react'
import type { ChangeEvent } from 'react'
import type { CreateSetRequest, ExerciseSetResponse } from './interfaces'
import { WeightUnit, DurationUnit, DistanceUnit } from '../model/enums'
import ExerciseService from '../exercises/exercise.service'

interface CreateSetProps {
    exerciseId:string,
    onCreate:() => void,
    onReturn:() => void
};

function CreateSet({ exerciseId, onCreate, onReturn }: CreateSetProps) {
    const [formData, setFormData] = useState<CreateSetRequest>({
        reps: null,
        weight: null,
        weightUnit: null,
        duration: null,
        durationUnit: null,
        distance: null,
        distanceUnit: null
  });

  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    console.log('changing', event);
    const { title, value } = event.target;
    setFormData(prev => ({
        ...prev,
        [title]: value ? value : null
    }));
  }
  
  const handleEnumChange = (event:ChangeEvent<HTMLSelectElement>) => {
    console.log('changing enum', event);
    const { title, value } = event.target;
    let enumType = (title == 'weightUnit' ? WeightUnit : (title == 'durationUnit' ? DurationUnit : (title == 'distanceUnit' ? DistanceUnit : '')));
    setFormData(prev => ({
        ...prev,
        [title]: value ? value as typeof enumType : null
    }));
  }

  const handleCancel = () => {
    onReturn();
  }

  const createSet = async () => {
    await ExerciseService.createSet(exerciseId, formData);
    onCreate();
  }

  return (
    <div>  
        <form action={createSet}>  
            <div>
                <label htmlFor="reps">Reps:</label>
                <input type="number" title="reps" value={formData.reps ?? 0} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="weight">Weight:</label>
                <input type="number" title="weight" value={formData.weight ?? 0} onChange={handleChange} />
                <select title="weightUnit" value={formData.weightUnit ?? ''} onChange={handleEnumChange}>
                    <option value="">
                        Select weight unit...
                    </option>
                    {Object.values(WeightUnit).map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="duration">Duration:</label>
                <input type="number" title="duration" value={formData.duration ?? 0} onChange={handleChange} />
                <select title="durationUnit" value={formData.durationUnit ?? ''} onChange={handleEnumChange}>
                    <option value="">
                        Select duration unit...
                    </option>
                    {Object.values(DurationUnit).map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="distance">Distance:</label>
                <input type="number" title="distance" value={formData.distance ?? 0} onChange={handleChange} />
                <select title="distanceUnit" value={formData.distanceUnit ?? ''} onChange={handleEnumChange}>
                    <option value="">
                        Select distance unit...
                    </option>
                    {Object.values(DistanceUnit).map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                    ))}
                </select>
            </div>
            <button type="submit">Save</button>
        </form>
        <button type="button" onClick={handleCancel}>Cancel</button>
    </div>
  )
}

export default CreateSet