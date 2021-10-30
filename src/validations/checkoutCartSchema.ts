import * as yup from 'yup';

export const checkoutCartSchema = yup.object({
        customerId: yup
            .number()
            .defined()
    });