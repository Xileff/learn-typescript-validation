import { z } from 'zod';

describe('Transform', () => {
  it('should support transformation', () => {
    const schema = z.string().transform((data) => data.toUpperCase());
    const result = schema.parse('Felix');
    console.info(result);
  });
});
