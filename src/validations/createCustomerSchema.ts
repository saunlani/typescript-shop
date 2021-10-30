import * as yup from 'yup';

export const createCustomerSchema = yup.object({
        firstName: yup
        .string()
        .defined(),
        lastName: yup
        .string()
        .defined(),
        email: yup
        .string()
        .defined(),
        cardNumber: yup
        .number().test(
            "maxDigits",
            "Card number must have exactly 16 digits",
            (number) => String(number).length === 16
          )        
          .defined(),
});