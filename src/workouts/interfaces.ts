export interface WorkoutResponse {
  id: string;
  addedByUserId: string;
  addedDate: Date;
  name: string;
  notes?: string | null;
  lastCompletedDate?: Date | null;
  lastEditedDate: Date;
  exercises: any[];
}

export interface UpdateWorkoutRequest {
  name: string;
  notes?: string | null;
}