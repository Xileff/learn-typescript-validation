import { z } from 'zod';

describe('zod', () => {
  it('should support validation', () => {
    const schema = z.string().min(3).max(100);
    const request = 'eko';
    const result = schema.parse(request);
    expect(result).toBe('eko');
  });

  it('should support validate primitive data type', () => {
    const usernameSchema = z.string().email();
    const isAdminSchema = z.boolean();
    const priceSchema = z.number().min(1000).max(1000000);

    const username = usernameSchema.parse('felix@example.com');
    expect(username).toEqual('felix@example.com');

    const isAdmin = isAdminSchema.parse(true);
    expect(isAdmin).toEqual(true);

    const price = priceSchema.parse(10000);
    expect(price).toStrictEqual(10000);
  });
});
