import { z } from "zod";

const categorySchem = z.object({
  title: z.string(),
  icon: z.string().nullish(),
  parent: z.string().nullish(),
});

export type Category = z.infer<typeof categorySchem>;
