
export interface UserResponse {
  firstName: string;
  lastName: string;
  email?: string | null;
  userName?: string | null;
  joinedDate: Date;
  lastEditedDate: Date;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
}

export interface RegistrationRequest {
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}