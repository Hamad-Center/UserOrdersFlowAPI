export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  ENGINEER = 'ENGINEER',
  INTERN = 'INTERN',
}

export interface User {
  id: number;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  department?: string;
  roles: UserRole[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  department?: string;
  roles?: UserRole[];
}

export interface UpdateUserDto {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  department?: string;
  roles?: UserRole[];
}
