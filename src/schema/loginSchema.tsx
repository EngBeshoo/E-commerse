import * as zod from "zod";

export const schema = zod
  .object({

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
  
  })
