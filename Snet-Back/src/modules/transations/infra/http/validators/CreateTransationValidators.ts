import * as Z from 'zod';

const schema = Z.object({
    userId: Z.number().nonnegative(),
    transationType: Z.string().nonempty(),
    description: Z.string(),
    value: Z.number().nonnegative(),
    status: Z.string()
})
export default schema