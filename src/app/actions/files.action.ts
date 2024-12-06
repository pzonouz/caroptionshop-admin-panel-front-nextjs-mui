"use server";

import { revalidateTag } from "next/cache";

const UploadAction = async (_prevState: any, formData: FormData) => {
  const res = await fetch(`${process.env.BACKEND_URL}/files/`, {
    method: "POST",
    body: formData,
  });
  if (!res?.ok) {
    return { error: await res.json() };
  }
  revalidateTag("files");
  return { success: true };
};

const DeleteFileAction = async (
  id: any,
  _prevState: any,
  formData: FormData,
) => {
  const res = await fetch(`${process.env.BACKEND_URL}/files/${id}/`, {
    method: "DELETE",
  });
  if (!res?.ok) {
    return { error: await res.json() };
  }
  revalidateTag("files");
  return { success: true };
};

export type FileType = {
  id: string;
  title: string;
  file: string;
  uuid: string;
};
export { UploadAction, DeleteFileAction };
