import * as Z from 'zod';

const schema = Z.object({
  name: Z.string().optional(),
});

export default schema;
