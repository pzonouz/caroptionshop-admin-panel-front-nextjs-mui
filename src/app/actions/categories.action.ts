"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";
import { FileType } from "./files.action";
import { redirect } from "next/navigation";

const categorySchema = z.object({
  id: z.string().nullish(),
  title: z.string().min(1, { message: "لطفا عنوان را وارد کنید" }),
  description: z.string().nullish(),
  parent: z.string().nullish(),
  status: z.boolean().default(true),
  image: z.string().min(1, { message: "لطفا عکس را انتخاب کنید" }),
  children: z.array(z.any()).nullish(),
});

export type CategoryType = z.infer<typeof categorySchema>;

const CreateCategoryAction = async (
  parent: string,
  description: string,
  status: boolean,
  image: FileType | null | undefined,
  _prevState: any,
  formData: FormData,
) => {
  if (image) {
    formData.append("image", image?.uuid);
  } else {
    formData.append("image", "");
  }
  const rawData = Object.fromEntries(formData);
  const validatedData = categorySchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten() };
  }
  validatedData.data.parent = parent == "0" ? null : parent;
  validatedData.data.description = description;
  validatedData.data.status = status;
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
  revalidateTag("category");
  redirect("/categories");
};

export { CreateCategoryAction };
