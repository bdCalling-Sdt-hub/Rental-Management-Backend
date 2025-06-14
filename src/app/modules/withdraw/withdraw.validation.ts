// import { z } from 'zod';

// // Define the Zod schemas for the nested objects
// const bankDetailsSchema = z
//   .object({
//     accountNumber: z.string().min(1, 'Account number is required.'),
//     accountName: z.string().min(1, 'Account name is required.'),
//     bankName: z.string().min(1, 'Bank name is required.'),
//   })
//   .partial(); 

// const paypalPayDetailsSchema = z
//   .object({
//     paypalId: z.string().min(1, 'PayPal ID is required.'),
//   })
//   .partial(); 

// const applePayDetailsSchema = z
//   .object({
//     appleId: z.string().min(1, 'Apple ID is required.'),
//   })
//   .partial();

// // Main Zod schema for withdrawal validation
// export const withdrawSchema = z.object({
//   mentorId: z.string().min(1, 'Mentor ID is required.'), // Assuming ObjectId is a string
//   amount: z.number().positive('Amount must be a positive number.'),
//   method: z.enum(['bank', 'paypal_pay', 'apple_pay']),
//   status: z.enum(['pending', 'paid']).default('pending'),
//   bankDetails: bankDetailsSchema.optional(),
//   paypalPayDetails: paypalPayDetailsSchema.optional(),
//   applePayDetails: applePayDetailsSchema.optional(),
//   transactionId: z.string().min(1, 'Transaction ID is required.'),
//   transactionDate: z.date().default(() => new Date()), // Default to current date
// });

// export const withdrawValidation = {
//   withdrawSchema,
// };
