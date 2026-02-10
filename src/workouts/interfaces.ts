import type { ExerciseResponse } from "../exercises/interfaces";

export interface WorkoutResponse {
  id: string;
  addedByUserId: string;
  addedDate: Date;
  name: string;
  notes?: string | null;
  lastCompletedDate?: Date | null;
  lastEditedDate: Date;
  exercises: ExerciseResponse[];
}

export interface UpdateWorkoutRequest {
  name: string;
  notes?: string | null;
}

export interface CreateWorkoutRequest {
  name: string;
  notes?: string | null;
}