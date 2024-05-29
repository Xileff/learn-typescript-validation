import { z } from 'zod';

describe('Zod date', () => {
  it('should be able to convert string to date', () => {
    const dateSchema = z.coerce
      .date()
      .min(new Date(1980, 0, 1))
      .max(new Date(2020, 0, 1));

    const birthDate = dateSchema.parse('2002-12-31');
    // console.info(dateSchema.parse(birthDate)); // 2002-12-31

    const birthDate1 = dateSchema.parse(new Date(2002, 2, 21)); // month 0-11, date starts from 2 (date is weird)
    // console.info(dateSchema.parse(birthDate1)); // 2002-03-20
  });
});
