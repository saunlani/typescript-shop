import * as yup from 'yup';

export const productSchema = yup.object({
        title: yup
            .string()
            .defined(),
        description: yup
            .string()
            .defined(),
        photo: yup
            .string()
            .defined(),
        price: yup
            .number()
            .defined(),
    });