"use client";

import { CategoryType } from "@/app/actions/categories.action";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectCategory = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: CategoryType[];
  selectedCategory: CategoryType;
  setSelectedCategory: any;
}) => {
  return (
    <FormControl sx={{ minWidth: "80%", marginX: "auto", marginTop: "3rem" }}>
      <InputLabel>Category</InputLabel>
      <Select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e?.target?.value);
        }}
        label="Category"
      >
        {categories.map((category) => {
          return (
            <MenuItem key={category.title} value={category}>
              {category.title}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export { SelectCategory };
