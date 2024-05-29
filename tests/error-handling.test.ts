import { ZodError, z } from 'zod';

describe('Zod Error', () => {
  it('should return zod error', () => {
    const emailSchema = z.string().email().min(3).max(100);
    try {
      emailSchema.parse('felix@gmail.com');
    } catch (err) {
      if (err instanceof ZodError) {
        err.errors.forEach((e) => {
          console.info(e.message);
        });
      }
    }
  });

  it('should also be able to return zod error without try catch', () => {
    const emailSchema = z.string().email().min(3).max(100);
    const result = emailSchema.safeParse('felix@gmail.com');
    if (result.success) {
      console.info(result);
    } else {
      console.error(result.error.errors.map((e) => e.message));
    }
  });
});
