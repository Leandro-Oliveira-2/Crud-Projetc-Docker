import { object, string, number } from 'zod';

const schema = object({
  email: string().nonempty().max(64),
  password: string().nonempty().max(1024),
  saldo: number().optional(),
});

export default schema;
