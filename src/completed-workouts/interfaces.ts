export interface CompletedWorkoutsResponse {
  items: CompletedWorkoutResponse[];
  pageSize: number;
  page: number;
  total: number;
  hasNextPage: boolean;
}

export interface CompletedWorkoutResponse {
  id: string;
  completedByUserId: string;
  workoutId: string;
  originalName?: string | null;
  originalNotes?: string | null;
  completedDate: Date;
  completedNotes?: string | null;
  lastEditedDate: Date;
  completedExercises: CompletedExerciseResponse[]
}

export interface CompletedExerciseResponse {
  id: string;
  exerciseId: string;
  completedByUserId: string;
  name?: string | null;
  originalNotes?: string | null;
  completedNotes?: string | null;
  completedDate: Date;

  completedExerciseSets: CompletedExerciseSetResponse[]
}

export interface CompletedExerciseSetResponse {
  id: string;
  exerciseName: string;
  exerciseSetId: string | null;
  completedWorkoutId: string;
  completedDate: Date;
  setNumber: number;
  reps?: number | null;
  goalReps?: number | null;
  weight?: number | null;
  goalWeight?: number | null;
  weightUnit?: string | null;
  duration?: number | null;
  goalDuration?: number | null;
  durationUnit?: string | null;
  distance?: number | null;
  goalDistance?: number | null;
  distanceUnit?: string | null;
}

export interface UpdateCompletedWorkoutRequest {
  completedNotes?: string | null;
}

export interface FinishWorkoutRequest {
  workoutId: string;
  completedDate: Date;
  completedNotes?: string | null;
  completedExercises: FinishExerciseRequest[];
}

export interface FinishExerciseRequest {
  exerciseId: string;
  fallbackName: string | null;
  completedDate: Date;
  exerciseNumber: number;
  completedExerciseSets: FinishExerciseSetRequest[];
}

export interface FinishExerciseSetRequest {
  exerciseSetId: string;
  completedDate: string;
  setNumber: number;
  reps?: number | null;
  goalReps?: number | null;
  weight?: number | null;
  goalWeight?: number | null;
  weightUnit?: string | null;
  duration?: number | null;
  goalDuration?: number | null;
  durationUnit?: string | null;
  distance?: number | null;
  goalDistance?: number | null;
  distanceUnit?: string | null;
}