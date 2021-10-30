import * as yup from 'yup';

export const getCartSchema = yup.object({
        customerId: yup
            .number()
            .defined(),
    });