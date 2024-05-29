import { z } from 'zod';

describe('Zod Object', () => {
  it('should parse object', () => {
    const loginSchema = z.object({
      username: z.string().email(),
      password: z.string().min(8).max(20),
    });

    const request = {
      username: 'felix@example.com',
      password: '12345678',
      ignore: 'thisWillBeIgnoredBySchema',
    };

    const result = loginSchema.safeParse(request);
    if (result.success) {
      console.info(result);
    } else {
      console.error(result.error.errors);
    }
  });

  it('should support nested object', () => {
    const createUserSchema = z.object({
      id: z.string().max(100),
      name: z.string().max(100),
      address: z.object({
        street: z.string().max(100),
        city: z.string().max(100),
        zip: z.string().max(5),
        country: z.string().max(100),
      }),
    });

    const request = {
      id: '1',
      name: 'Felix',
      address: {
        street: 'Jl. Kebahagiaan',
        city: 'Konoha',
        zip: '12345',
        country: 'Wakanda',
      },
    };

    const result = createUserSchema.safeParse(request);
    if (result.success) {
      console.info(result);
    } else {
      console.error(result.error.errors);
    }
  });
});
