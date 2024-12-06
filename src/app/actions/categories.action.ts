"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";
import { FileType } from "./files.action";

const categorySchema = z.object({
  title: z.string().min(1, { message: "لطفا عنوان را وارد کنید" }),
  description: z.string().nullish(),
  parent: z.string().nullish(),
  status: z.boolean().default(true),
  image: z.string().nullish(),
});

export type CategoryType = z.infer<typeof categorySchema>;

const CreateCategoryAction = async (
  description: string,
  status: boolean,
  image: FileType | null | undefined,
  _prevState: any,
  formData: FormData,
) => {
  const rawData = Object.fromEntries(formData);
  const validatedData = categorySchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten() };
  }
  validatedData.data.parent =
    validatedData.data.parent == "0" ? null : validatedData.data.parent;
  validatedData.data.description = description;
  validatedData.data.status = status;
  validatedData.data.image = image?.uuid;
  const res = await fetch(`${process.env.BACKEND_URL}/categories/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(validatedData.data),
  });
  if (!res?.ok) {
    const formError = JSON.stringify(await res.json());
    const err = { fieldErrors: {}, formErrors: formError };
    return { error: err, data: validatedData?.data };
  }
  revalidateTag("categories");
  const err = { fieldErrors: {}, formErrors: {} };
  return { success: true, error: err };
};

export { CreateCategoryAction };
