import * as Z from 'zod';

const schema = Z.object({
    userId: Z.number().nonnegative(),
    dateOfAtualization: Z.date().optional(),
    valueOfTheDay: Z.number().optional()
})
export default schema