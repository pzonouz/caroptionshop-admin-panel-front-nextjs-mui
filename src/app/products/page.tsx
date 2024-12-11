"use server";

import { ListCategories } from "../components/Category/ListCategories";

const page = async () => {
  const categoriesRes = await fetch(`${process.env.BACKEND_URL}/categories`, {
    next: { tags: ["category"] },
  });
  const filesRes = await fetch(`${process.env.BACKEND_URL}/files`, {
    next: { tags: ["files"] },
  });
  const [categories, images] = await Promise.all([
    categoriesRes.json(),
    filesRes.json(),
  ]);

  return <ListCategories categories={categories} images={images} />;
};
export default page;
