import { z } from "zod";
// import { matchIsValidTel } from "mui-tel-input";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const signUpSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name must not be less than one char",
  }),
  email: z.string().email().trim().min(1, {
    message: "Email address can't be less than one char",
  }),
  // phone: z.string().refine((value) => matchIsValidTel(value), {
  //   message: "Invalid phone number",
  // }),
  password: z.string().min(8),
});
