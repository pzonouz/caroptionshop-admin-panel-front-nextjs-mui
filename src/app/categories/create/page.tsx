import { CreateCategory } from "@/app/components/Category/CreateCategory";

const page = async () => {
  const resCategories = await fetch(`${process.env.BACKEND_URL}/categories`);
  const resImages = await fetch(`${process.env.BACKEND_URL}/files`, {
    next: { tags: ["files"] },
  });
  const [categories, images] = await Promise.all([
    resCategories.json(),
    resImages.json(),
  ]);
  return <CreateCategory categories={categories} images={images} />;
};
export default page;
