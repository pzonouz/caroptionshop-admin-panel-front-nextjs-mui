"use server";

import { ListCategories } from "../components/Category/ListCategories";

const page = async () => {
  const categoriesRes = await fetch(`${process.env.BACKEND_URL}/categories`, {
    next: { tags: ["category"] },
  });
  const categories = await categoriesRes.json();
  return <ListCategories categories={categories} />;
};
export default page;
