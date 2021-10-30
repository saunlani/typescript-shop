import * as yup from 'yup';

export const updateProductSchema = yup.object({
        id: yup
            .number()
            .defined(),
        title: yup
            .string(),
        description: yup
            .string(),
        photo: yup
            .string(),
        price: yup
            .number().min(.01)
    });