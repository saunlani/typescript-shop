import * as yup from 'yup';

export const getProductsWithTitleSchema = yup.object({
            title: yup
            .string()
            .defined(),
    });