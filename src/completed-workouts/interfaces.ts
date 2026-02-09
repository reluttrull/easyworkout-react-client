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
  completedExercises: any[]
}