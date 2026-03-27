// Utility functions and helpers
// Add your utility functions here

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}