import { v4, validate } from 'uuid';

export function isUUID(input: string): boolean {
  return validate(input);
}

export function generateUUID(): string {
  return v4();
}
