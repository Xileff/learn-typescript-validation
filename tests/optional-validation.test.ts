import { z } from 'zod';

describe('Optional validation', () => {
  it('should support optional validation', () => {
    const registerSchema = z.object({
      username: z.string().email('Invalid email'),
      password: z.string().min(8).max(32),
      firstName: z
        .string()
        .min(2, 'First name too short')
        .max(100, 'First name too long'),
      lastName: z
        .string()
        .min(2, 'Last name too short')
        .max(100, 'Last name too long')
        .optional(),
    });

    const request = {
      username: 'felix@example.com',
      password: '11111111',
      firstName: 'Felix',
    };

    const result = registerSchema.safeParse(request);
    if (result.success) {
      console.info(result.data);
    } else {
      console.error(result.error.errors.map((e) => e.message));
    }
  });
});
