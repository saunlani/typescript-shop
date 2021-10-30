import * as yup from 'yup';

export const createCartSchema = yup.object({
        customerId: yup
            .number()
            .defined()
    });