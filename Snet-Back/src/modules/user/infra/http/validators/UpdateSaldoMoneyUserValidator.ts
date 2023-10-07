
import * as Z from 'zod';

const schema = Z.object({
  saldo: Z.number()
});

export default schema;
