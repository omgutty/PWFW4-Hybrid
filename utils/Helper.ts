import * as fs from 'fs';
import * as path from 'path';

/**
 * Generates a unique email address using a prefix and current timestamp.
 * Use for registration tests to avoid duplicate email conflicts.
 */
export function randomEmail(prefix: string = 'testuser'): string {
  return `${prefix}_${Date.now()}@email.com`;
}

/**
 * Generates a random integer between min and max (inclusive).
 */
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Reads and parses a JSON file. Returns typed result.
 * Usage: const data = readJSON<CourseData>('testdata/course.json')
 */
export function readJSON<T>(filePath: string): T {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const raw = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(raw) as T;
}

/**
 * Appends a timestamp suffix to a string — useful for creating unique names
 * in tests that create entities (courses, categories, users).
 */
export function withTimestamp(base: string): string {
  return `${base}_${Date.now()}`;
}