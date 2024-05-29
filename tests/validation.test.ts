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

    // try {
    //   priceSchema.parse(1);
    // } catch (err) {
    //   console.info(err);
    // }
  });

  it('should support primitive data type conversion', () => {
    const usernameSchema = z.coerce.string().min(8).max(20);
    const isAdminSchema = z.coerce.boolean(); // does not really work well, 'false' will become true
    const priceSchema = z.coerce.number().min(1000).max(1000000);

    const username = usernameSchema.parse(12345678);
    expect(username).toBe('12345678');

    const isAdmin = isAdminSchema.parse('false');
    expect(isAdmin).toStrictEqual(true);

    const price = priceSchema.parse('1000');
    expect(price).toStrictEqual(1000);
  });
});
