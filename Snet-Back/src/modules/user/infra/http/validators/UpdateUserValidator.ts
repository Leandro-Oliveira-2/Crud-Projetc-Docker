import * as Z from 'zod';

const schema = Z.object({
  name: Z.string().max(64).optional(),
  gender: Z.enum(['MASCULINO', 'FEMININO', 'OUTROS']).optional(),
  email: Z.string().max(64).optional(),
  phone: Z.string().max(20).optional(),
  adress: Z.string().max(128).optional(),
  saldo: Z.number().optional()
});

export default schema;
