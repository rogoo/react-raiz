export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserFormValues {
  name: string;
  email: string;
}

export interface UserFilterValues {
  name: string;
  email: string;
}

export interface UserFormErrors {
  name?: string;
  email?: string;
}

export const NAME_MAX_LENGTH = 55;
export const EMAIL_MAX_LENGTH = 65;
