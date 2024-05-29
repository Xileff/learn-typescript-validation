import { z } from 'zod';

describe('Collection validation', () => {
  it('should be able to validate array', () => {
    const arraySchema = z.array(z.string().max(3)).min(1).max(10);
    const request = ['abc', 'bcd', 'cde'];
    const response = arraySchema.safeParse(request);
    if (response.success) {
      console.info(response.data);
    } else {
      console.error(response.error.errors);
    }
  });

  it('should be able to validate set', () => {
    const setSchema = z.set(z.string().email()).min(1).max(10);
    const request: Set<string> = new Set([
      'felix@example.com',
      'vincent@example.com',
    ]);
    const response = setSchema.safeParse(request);
    if (response.success) {
      console.info(response.data);
    } else {
      console.error(response.error.errors);
    }
  });

  it('should support map validation', () => {
    const mapSchema = z.map(z.string(), z.string().email());
    const request: Map<string, string> = new Map<string, string>([
      ['felix', 'felix@example.com'],
      ['vincent', 'vincent@example.com'],
    ]);
    const response = mapSchema.safeParse(request);
    if (response.success) {
      console.info(response.data);
    } else {
      console.error(response.error.errors);
    }
  });
});
