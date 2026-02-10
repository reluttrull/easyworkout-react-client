import type { DistanceUnit, DurationUnit, WeightUnit } from "../model/enums";

export interface ExerciseSetResponse {
  id: string;
  exerciseId: string;
  setNumber: number;
  reps?: number | null;
  weight?: number | null;
  weightUnit?: string | null;
  duration?: number | null;
  durationUnit?: string | null;
  distance?: number | null;
  distanceUnit?: string | null;
} 

export interface CreateSetRequest {
  reps?: number | null;
  weight?: number | null;
  weightUnit?: WeightUnit | null;
  duration?: number | null;
  durationUnit?: DurationUnit | null;
  distance?: number | null;
  distanceUnit?: DistanceUnit | null;
}