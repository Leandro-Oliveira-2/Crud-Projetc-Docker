import * as Z from 'zod';

const schema = Z.object({
    userPutId: Z.number().nonnegative(),
    userGetId: Z.number().nonnegative(),
    value: Z.number().nonnegative(),
    description: Z.string()
});

export default schema;


