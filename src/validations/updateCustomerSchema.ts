import * as yup from 'yup';

export const updateCustomerSchema = yup.object({
    customerId: yup
        .number()
        .defined(),
        active: yup
        .bool(),
        firstName: yup
        .string(),
        lastName: yup
        .string(),
        email: yup
        .string(),
        cardNumber: yup
        .number().test(
            "maxDigits",
            "Card number must have exactly 16 digits",
            (number) => String(number).length === 16
          )
});