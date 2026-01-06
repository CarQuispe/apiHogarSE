
export const getFileExtension = (filename: string): string =>
  filename.split('.').pop() || ''; // Default to empty string if no extension
