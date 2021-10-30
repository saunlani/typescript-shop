import * as yup from 'yup';

export const getProductsWithDescriptionAndTitleSchema = yup.object({
            description: yup
            .string()
            .defined(),
            title: yup
            .string()
            .defined(),
    });