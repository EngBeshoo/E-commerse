import * as zod from "zod";

export const schema = zod
  .object({
    name: zod
      .string()
      .nonempty("Please enter your name")
      .min(3, "Name min 3 char")
      .max(10, "Name max 10 char"),

    email: zod
      .string()
      .nonempty("please enter your email")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid Email"
      ),

    password: zod
      .string()
      .nonempty("please enter your password")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Invalid Password"
      ),

    rePassword: zod.string().nonempty("rePassword is required"),
  
    phone:zod.string().nonempty("please enter your phone number").regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
  })
  .refine((data) => data.password == data.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match", 
  });