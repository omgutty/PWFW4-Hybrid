// Defines the shape of every data file — TypeScript will catch typos and missing fields

export interface Credentials {
  username: string;
  password: string;
}

export interface RegistrationData {
  name:     string;
  email:    string;
  password: string;
  state:    string;
  hobbies:  string[];
}

export interface CourseData {
  courseName:     string;
  description:    string;
  instructorName: string;
  price:          string;
  category:       string;
  thumbnail:      string;
}