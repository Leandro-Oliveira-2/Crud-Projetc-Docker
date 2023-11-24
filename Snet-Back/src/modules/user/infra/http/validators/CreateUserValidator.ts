import * as Z from 'zod';

const schema = Z.object({
  name: Z.string().nonempty().max(64),
  gender: Z.enum(['MASCULINO', 'FEMININO', 'OUTROS']),
  email: Z.string().nonempty().max(64),
  phone: Z.string().nonempty().max(20),
  adress: Z.string().max(128),
  secret: Z.string(),
  saldo: Z.number(),
  fidelidade: Z.object({
    dia: Z.number().optional(),
    data: Z.date().optional(),
    quantityRewards: Z.number().optional(),
    rewardDates: Z.array(Z.date()).optional(),
  }),
  enabled: Z.boolean().optional(),
});

export default schema;

