import * as yup from 'yup';

export const removeFromCartSchema = yup.object({
        customerId: yup
            .number()
            .defined(),
        productId: yup
            .number()
            .defined(),
        quantity: yup
            .number().min(1)
            .defined(),
    });