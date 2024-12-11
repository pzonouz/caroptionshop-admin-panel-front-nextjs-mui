"use client";

import { CategoryType } from "@/app/actions/categories.action";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectCategory = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: CategoryType[];
  selectedCategory: CategoryType | number;
  setSelectedCategory: any;
}) => {
  return (
    <FormControl sx={{ minWidth: "80%", marginX: "auto", marginTop: "3rem" }}>
      <InputLabel>Category</InputLabel>
      <Select
        value={selectedCategory || 0}
        onChange={(e) => {
          setSelectedCategory(e?.target?.value);
        }}
        label="Category"
      >
        <MenuItem key={0} value={0}>
          بخش اصلی
        </MenuItem>
        {categories.map((category) => {
          return (
            <MenuItem key={category?.title} value={category}>
              {category.title}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export { SelectCategory };
