// Defines the shape of every data file — TypeScript will catch typos and missing fields
/**
 * The one-line summary: JSON tells TypeScript what the data IS right now. The interface tells TypeScript what the data MUST ALWAYS BE. The interface is the contract — the JSON is just one implementation of it.
 */

/**
 * Reason 4 — It documents what fields are REQUIRED vs OPTIONAL
Plain JSON has no way to express that a field is optional. The interface makes this explicit:


Reason 3 — Factory functions and API responses need explicit types
Your test data doesn't only come from JSON files. It also comes from:

API responses (when you add an API layer)
Factory functions that generate data programmatically
Page objects that return scraped data from the UI

None of these have a JSON file for TypeScript to auto-infer from. The interface is the only source of truth:

Reason 2 — JSON files can be changed without TypeScript catching it
This is the most important reason in a team/enterprise context.
Imagine three months from now, someone renames username to email in credentials.json:

Reason 1 — JSON inference is a literal type, not a contract
TypeScript infers JSON as the exact shape of that specific file. It does NOT create a reusable contract. The moment you need the same shape in two different places, you have no shared definition to point to.
 */


export interface Credentials {
  username: string;
  password: string;
}
/**
 * 
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
 */