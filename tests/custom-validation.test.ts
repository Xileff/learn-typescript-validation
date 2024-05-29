import { RefinementCtx, z } from 'zod';

describe('Custom validation', () => {
  it('should support refinement', () => {
    const loginSchema = z.object({
      username: z
        .string()
        .email()
        .transform((data: string, ctx: RefinementCtx): string => {
          if (data !== data.toUpperCase()) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Username must be uppercase.',
            });
            return z.NEVER;
          }
          return data;
        }),
      password: z.string().min(8).max(32),
    });

    const request = {
      username: 'felix@example.com',
      password: '12345678',
    };

    const result = loginSchema.safeParse(request);

    if (result.success) {
      console.info(result.data);
    } else {
      console.error(result.error.errors);
    }
  });
});
