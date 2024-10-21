import { z } from "zod";

const addProductSchema = z
  .object({
    title: z
      .string()
      .min(4, { message: "Title must be at least 4 characters" }),
    price: z.string().min(1, { message: "Price can't be empty" }),
    description:z.string().min(1,{message:"Please, add description for product"})
  })
  .refine((data) => +data.price !== 0, {
    message: "Price must be greater than zero",
    path: ["price"],
  });


type TAddProductForm = z.infer<typeof addProductSchema>;

export { addProductSchema, type TAddProductForm };
