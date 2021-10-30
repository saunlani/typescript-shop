import * as yup from 'yup';

export const createProductSchema = yup.object({
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
            .number().min(.01)
            .defined()
    });