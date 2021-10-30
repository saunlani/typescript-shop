import * as yup from 'yup';

export const getProductsWithDescriptionSchema = yup.object({
            description: yup
            .string()
            .defined(),
    });