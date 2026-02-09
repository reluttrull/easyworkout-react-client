export interface ExerciseResponse {
  id: string;
  addedByUserId: string;
  addedDate: Date;
  exerciseNumber: number;
  name: string;
  notes?: string | null;
  lastEditedDate: Date;
  exerciseSets: any[];
}