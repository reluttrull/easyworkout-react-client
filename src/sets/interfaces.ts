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