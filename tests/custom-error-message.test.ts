import { z } from 'zod';

describe('Custom validation message', () => {
  it('should support custom validation message', () => {
    const schema = z.object({
      email: z
        .string()
        .email('Invalid email')
        .min(8, 'Email must be at least 8 characters long.')
        .max(50, 'Email must be 50 characters at most.'),
      password: z
        .string()
        .min(8, 'Password must be at least 8 characters.')
        .max(32, 'Password must be 32 characters at most.'),
    });

    const request = {
      email: 'fel@example',
      password: '1234567',
    };

    const result = schema.safeParse(request);
    if (result.success) {
      console.info(result.data);
    } else {
      console.error(result.error.errors.map((e) => e.message));
    }
  });
});
